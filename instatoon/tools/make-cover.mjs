// 릴스 전용 커버(1080×1920). 프로필 격자는 가운데 3:4(y 240~1680), 피드는 가운데 4:5(y 285~1635)만 보여 주므로
// 제목·그림·계정명을 모두 y 300~1620 안에 둡니다.
// 사용법: node tools/make-cover.mjs episodes/ep001
import { resolve } from 'node:path';
import { chromium, shoot, ROOT } from './pw.mjs';
import { loadEpisode, paletteOf, fontCss, HANDLE } from './layout.mjs';
import { sceneSvg } from './scenes.mjs';

const epDir = resolve(process.argv[2] || '');
const ep = loadEpisode(epDir);
const p = paletteOf(ep);
const s0 = ep.slides[0];
const esc = (t = '') => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
const art = s0.art?.startsWith('scene:')
  ? `<svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">${sceneSvg(s0.art.slice(6))}</svg>`
  : `<img src="file://${resolve(epDir, s0.art)}">`;
const label = `${ep.series || ''}${ep.no ? ` EP.${String(ep.no).padStart(2, '0')}` : ''}`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
${fontCss('file://' + ROOT + '/assets/fonts')}
html,body{margin:0;width:1080px;height:1920px}
body{font-family:Jua,sans-serif;color:${p.ink};word-break:keep-all;background:radial-gradient(circle at 50% 30%, #FFFFFF 0%, ${p.bg} 40%, ${p.bg2} 100%);position:relative;overflow:hidden}
.label{position:absolute;left:50%;top:318px;transform:translateX(-50%);background:${p.accent};color:#fff;font-size:40px;padding:10px 34px;border-radius:999px;white-space:nowrap}
.title{position:absolute;left:50px;right:50px;top:412px;height:330px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:132px;line-height:1.12;letter-spacing:-3px}
.art{position:absolute;left:110px;top:780px;width:860px;height:740px;background:#fff;border-radius:56px;overflow:hidden;border:6px solid ${p.bg2};box-shadow:0 14px 0 ${p.bg2}}
.art svg,.art img{width:100%;height:100%;display:block;object-fit:cover}
.handle{position:absolute;left:0;right:0;top:1556px;text-align:center;font-size:44px;opacity:.7}
</style></head><body>
${label.trim() ? `<div class="label">${esc(label)}</div>` : ''}
<div class="title"><div id="T">${esc(ep.hook || s0.title)}</div></div>
<div class="art">${art}</div>
<div class="handle">${esc(ep.handle || HANDLE)}</div>
<script>const t=document.getElementById('T');let f=132;while((t.scrollWidth>980||t.offsetHeight>330)&&f>70){f-=4;t.parentElement.style.fontSize=f+'px';}</script>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
await shoot(page, html, resolve(epDir, 'out/reel-cover.png'), { width: 1080, height: 1920 });
await browser.close();
console.log('커버 저장', resolve(epDir, 'out/reel-cover.png').replace(ROOT + '/', ''));
