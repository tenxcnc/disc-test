// 사용법: node tools/build-reel.mjs episodes/ep001 [--music path/to/bgm.mp3] [--no-render]
// episode.json → HyperFrames 프로젝트(out/reel-project) → out/reel.mp4 (1080×1920, 30fps)
// 캐러셀과 같은 슬라이드를 쓰되, 카메라 이동·말풍선 팝·화면 흔들림·효과음을 입혀 릴스툰으로 만듭니다.
import { cpSync, mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { execFileSync } from 'node:child_process';
import { ROOT } from './pw.mjs';
import { loadEpisode, slideHtml, slideCss, fontCss, paletteOf, SLIDE_W, SLIDE_H } from './layout.mjs';
import { hamzzi } from './characters.mjs';

const args = process.argv.slice(2);
const epDir = resolve(args.find((a) => !a.startsWith('--')) || '');
const musicIdx = args.indexOf('--music');
const music = musicIdx >= 0 ? resolve(args[musicIdx + 1]) : null;
const noRender = args.includes('--no-render');

const ep = loadEpisode(epDir);
const p = paletteOf(ep);
const W = 1080, H = 1920;
const SCALE = 0.84;
const PX = Math.round((W - SLIDE_W * SCALE) / 2);
const PY = 455;
const ENTER = 0.38; // 다음 장면이 밀고 들어오는 시간

const proj = resolve(epDir, 'out/reel-project');
rmSync(proj, { recursive: true, force: true });
mkdirSync(resolve(proj, 'assets/panels'), { recursive: true });
cpSync(resolve(ROOT, 'assets/fonts'), resolve(proj, 'assets/fonts'), { recursive: true });
cpSync(resolve(ROOT, 'assets/sfx'), resolve(proj, 'assets/sfx'), { recursive: true });
cpSync(resolve(ROOT, 'assets/vendor/gsap.min.js'), resolve(proj, 'assets/gsap.min.js'));
for (const s of ep.slides) if (s.art && !s.art.startsWith('scene:')) cpSync(resolve(epDir, s.art), resolve(proj, 'assets/panels', basename(s.art)));

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
const f2 = (n) => Math.round(n * 1000) / 1000;

// ── 타임라인 계산 ──────────────────────────────────────────────
let t = 0;
const timeline = ep.slides.map((s, i) => {
  const dur = s.reel?.dur ?? 3;
  const seg = { i, start: t, dur };
  t += dur;
  return seg;
});
const endDur = ep.reelEnd?.dur ?? 2.4;
const endStart = t;
const TOTAL = f2(t + endDur);

const audio = []; // [name, at, vol]
const anim = []; // GSAP 문장

timeline.forEach(({ i, start, dur }) => {
  const s = ep.slides[i];
  const r = s.reel || {};
  const [z0, z1] = r.zoom || [1, 1.05];
  const [fx, fy] = r.focus || [0.5, 0.5];
  // 장면 진입
  if (i === 0) anim.push(`tl.fromTo('#PW${i}',{scale:.92,opacity:0},{scale:1,opacity:1,duration:.45,ease:'back.out(1.6)'},${f2(start)});`);
  else anim.push(`tl.fromTo('#PW${i}',{x:${W}},{x:0,duration:${ENTER},ease:'power3.out'},${f2(start)});`);
  if (i > 0) audio.push(['whoosh', start, 0.55]);
  // 카메라(줌·초점)
  anim.push(`gsap.set('#CAM${i}',{transformOrigin:'${fx * 100}% ${fy * 100}%'});`);
  anim.push(`tl.fromTo('#CAM${i}',{scale:${z0}},{scale:${z1},duration:${f2(dur + ENTER)},ease:'sine.inOut'},${f2(start)});`);
  // 장면 효과음
  for (const [name, at, vol] of r.sfx || []) audio.push([name, start + at, vol ?? 0.8]);
  // 화면 흔들림
  if (r.shake != null) {
    const st = start + r.shake;
    anim.push(
      `tl.to('#SHK${i}',{keyframes:[{x:-18,y:6},{x:16,y:-6},{x:-12,y:4},{x:10,y:-3},{x:-5,y:2},{x:0,y:0}],duration:.42,ease:'none'},${f2(st)});`
    );
  }
  // 레이어(말풍선·자막) 순차 등장
  (s.layers || []).forEach((L, j) => {
    const at = start + (L.at ?? 0.5 + j * 0.8);
    const id = `#L${i}_${j}`;
    if (L.type === 'caption' || L.type === 'cta')
      anim.push(`tl.fromTo('${id}',{y:40,opacity:0},{y:0,opacity:1,duration:.35,ease:'power2.out'},${f2(at)});`);
    else if (L.type === 'mail' || L.type === 'card' || L.type === 'compare')
      anim.push(`tl.fromTo('${id}',{opacity:0,y:24},{opacity:1,y:0,duration:.4,ease:'power2.out'},${f2(at)});`);
    else anim.push(`tl.fromTo('${id}',{scale:.3,opacity:0},{scale:1,opacity:1,duration:.38,ease:'back.out(2.2)'},${f2(at)});`);
    const sfx = L.sfx === false ? null : L.sfx || (L.type === 'bubble' ? 'pop' : L.type === 'mail' ? null : 'pop');
    if (sfx) audio.push([sfx, at, sfx === 'pop' ? 0.7 : 0.85]);
  });
});

// 상단 훅·진행바·엔딩
anim.unshift(
  `tl.fromTo('#HOOK',{scale:.6,opacity:0},{scale:1,opacity:1,duration:.45,ease:'back.out(2)'},0);`,
  `tl.fromTo('#SERIES',{y:-30,opacity:0},{y:0,opacity:1,duration:.35,ease:'power2.out'},.1);`,
  `tl.fromTo('#BAR',{scaleX:0},{scaleX:1,duration:${TOTAL},ease:'none'},0);`
);
anim.push(
  `tl.fromTo('#ENDCARD',{y:${H}},{y:0,duration:.45,ease:'power3.out'},${f2(endStart)});`,
  `tl.fromTo('#ENDHAM',{scale:.4,rotation:-12},{scale:1,rotation:0,duration:.5,ease:'back.out(2.4)'},${f2(endStart + 0.25)});`,
  `tl.fromTo('#ENDNEXT',{opacity:0,y:30},{opacity:1,y:0,duration:.35},${f2(endStart + 0.55)});`,
  `tl.fromTo('#ENDCTA',{opacity:0,scale:.8},{opacity:1,scale:1,duration:.4,ease:'back.out(2)'},${f2(endStart + 0.95)});`
);
audio.push(['whoosh', endStart, 0.55], ['chime', endStart + 0.3, 0.8], ['pop', endStart + 0.95, 0.7]);

// ── HTML 조립 ─────────────────────────────────────────────────
const panels = timeline
  .map(({ i, start, dur }) => {
    const visible = i === timeline.length - 1 ? dur + 0.5 : dur + ENTER + 0.05;
    return `<div id="P${i}" class="clip" data-start="${f2(start)}" data-duration="${f2(visible)}" data-track-index="1" style="z-index:${10 + i}">
      <div class="pframe"><div id="PW${i}" class="pwrap"><div id="SHK${i}" class="shk"><div id="CAM${i}" class="cam">
        ${slideHtml(ep, ep.slides[i], i, { epDir, mode: 'reel' })}
      </div></div></div></div></div>`;
  })
  .join('\n');

const audioTags = audio
  .map(([name, at, vol], k) => {
    const file = resolve(ROOT, 'assets/sfx', `${name}.wav`);
    if (!existsSync(file)) throw new Error(`효과음 없음: ${name}`);
    return `<audio id="A${k}" data-start="${f2(at)}" data-duration="1" data-volume="${vol}" data-track-index="${5 + (k % 3)}" src="assets/sfx/${name}.wav"></audio>`;
  })
  .join('\n');

let musicTag = '';
if (music) {
  cpSync(music, resolve(proj, 'assets', 'bgm' + music.slice(music.lastIndexOf('.'))));
  musicTag = `<audio id="BGM" data-start="0" data-duration="${TOTAL}" data-volume="0.22" data-fade-out="1.2" data-track-index="4" src="assets/bgm${music.slice(music.lastIndexOf('.'))}"></audio>`;
}

const html = `<!doctype html>
<html lang="ko" data-resolution="portrait">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=${W}, height=${H}" />
<script src="assets/gsap.min.js"></script>
<style>
${fontCss('assets/fonts')}
* { margin:0; padding:0; box-sizing:border-box; }
html, body { width:${W}px; height:${H}px; overflow:hidden; background:${p.bg2}; }
#root { position:relative; width:${W}px; height:${H}px; overflow:hidden; font-family:Jua,sans-serif; color:${p.ink};
  background: radial-gradient(circle at 50% 0%, #FFFFFF 0%, ${p.bg} 45%, ${p.bg2} 100%); }
.full { position:absolute; inset:0; }
#SERIES { position:absolute; left:50%; top:150px; transform:translateX(-50%); }
#SERIES span { display:inline-block; background:${p.accent}; color:#fff; font-size:38px; padding:10px 34px; border-radius:999px; white-space:nowrap; }
#HOOK { position:absolute; left:40px; right:40px; top:225px; text-align:center; font-size:76px; line-height:1.14; letter-spacing:-1.5px; }
#BARWRAP { position:absolute; left:${PX}px; width:${Math.round(SLIDE_W * SCALE)}px; top:${PY - 26}px; height:10px; border-radius:6px; background:rgba(0,0,0,.08); overflow:hidden; }
#BAR { width:100%; height:100%; background:${p.accent}; transform-origin:0 50%; }
.pframe { position:absolute; left:${PX}px; top:${PY}px; width:${SLIDE_W}px; height:${SLIDE_H}px; transform:scale(${SCALE}); transform-origin:0 0;
  border-radius:56px; overflow:hidden; box-shadow:0 14px 0 rgba(0,0,0,.06); }
.pwrap, .shk, .cam { position:absolute; inset:0; }
${slideCss(p)}
.slide { border-radius:56px; }
#ENDCARD { position:absolute; left:${PX}px; top:${PY}px; width:${Math.round(SLIDE_W * SCALE)}px; height:${Math.round(SLIDE_H * SCALE)}px;
  border-radius:48px; background:linear-gradient(180deg,${p.bg} 0%,#fff 100%); box-shadow:0 14px 0 rgba(0,0,0,.06);
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:34px; text-align:center; }
#ENDHAM { width:440px; height:440px; }
#ENDNEXT { font-size:52px; line-height:1.25; padding:0 50px; }
#ENDCTA { background:${p.ink}; color:#fff; font-size:44px; padding:20px 40px; border-radius:999px; }
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="${W}" data-height="${H}">
  <div id="TOP" class="clip full" data-start="0" data-duration="${TOTAL}" data-track-index="0" style="z-index:50;pointer-events:none">
    ${ep.series ? `<div id="SERIES"><span>${esc(ep.series)}${ep.no ? ` EP.${String(ep.no).padStart(2, '0')}` : ''}</span></div>` : ''}
    <div id="HOOK">${esc(ep.hook || ep.slides[0].title)}</div>
    <div id="BARWRAP"><div id="BAR"></div></div>
  </div>
${panels}
  <div id="END" class="clip full" data-start="${f2(endStart)}" data-duration="${f2(endDur)}" data-track-index="2" style="z-index:40">
    <div id="ENDCARD">
      <svg id="ENDHAM" viewBox="0 0 400 400">${hamzzi({ expr: 'happy', badge: !!ep.badge })}</svg>
      <div id="ENDNEXT">${esc(ep.reelEnd?.text || '다음 편도 기대해 주세요')}</div>
      <div id="ENDCTA">${esc(ep.reelEnd?.cta || '팔로우하고 다음 편 받기')}</div>
    </div>
  </div>
${audioTags}
${musicTag}
</div>
<script>
  window.__timelines = window.__timelines || {};
  const tl = gsap.timeline({ paused: true });
  ${anim.join('\n  ')}
  window.__timelines["main"] = tl;
  tl.seek(0);
</script>
</body>
</html>`;

writeFileSync(resolve(proj, 'index.html'), html);
writeFileSync(resolve(proj, 'meta.json'), JSON.stringify({ id: `reel-${ep.id}`, name: `${ep.id} reel` }, null, 2));
writeFileSync(
  resolve(proj, 'hyperframes.json'),
  JSON.stringify({ $schema: 'https://hyperframes.heygen.com/schema/hyperframes.json', paths: { assets: 'assets' } }, null, 2)
);
console.log(`릴스 프로젝트 생성: ${proj.replace(ROOT + '/', '')} (총 ${TOTAL}초, 효과음 ${audio.length}개)`);

if (!noRender) {
  const out = resolve(epDir, 'out/reel.mp4');
  const hf = resolve(ROOT, 'node_modules/.bin/hyperframes');
  execFileSync(hf, ['render', proj, '-o', out, '--fps', '30', '--quality', 'delivery', '--quiet'], {
    stdio: 'inherit',
    env: { ...process.env, HYPERFRAMES_NO_TELEMETRY: '1', DO_NOT_TRACK: '1' },
  });
  console.log('릴스 완성:', out.replace(ROOT + '/', ''));
}
