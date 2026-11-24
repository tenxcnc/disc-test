// 간단 대본(season1.mjs) → episodes/ep0NN/episode.json 생성기
// 사용법: node tools/gen-episodes.mjs            (전체)
//         node tools/gen-episodes.mjs 4 5 6      (일부 편만)
// 말풍선·카드 높이를 브라우저에서 실제로 재서 겹치지 않게 세로 위치를 잡습니다.
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium, ROOT } from './pw.mjs';
import { slideHtml, slideCss, fontCss, paletteOf, SLIDE_W, SLIDE_H } from './layout.mjs';
import { EPISODES } from '../season1.mjs';
import { REEL, CAROUSEL, TAIL } from '../captions.mjs';

const only = process.argv.slice(2).map(Number);
const SERIES = '햄찌의 취준일기';
const TAGS = {
  공감툰: ['인스타툰', '공감툰', '취준생', '취업준비', '직장인공감', '햄찌의취준일기'],
  정보툰: ['인스타툰', '정보툰', '취업준비', '취준생', '취업팁', '햄찌의취준일기'],
  심리툰: ['인스타툰', '심리툰', '인간관계', '대인관계', '관계통역', '햄찌의취준일기'],
};
const CAP_TAIL = {
  공감툰: '💬 여러분의 이야기도 댓글로 들려주세요\n📌 저장해두고 지칠 때 다시 보기',
  정보툰: '💬 궁금한 점은 댓글로 남겨 주세요\n📌 저장해두고 필요할 때 꺼내 보기',
  심리툰: '💌 필요한 친구에게 보내 주세요\n📌 저장해두고 마음이 복잡할 때 다시 보기',
};
const END_CTA = { 공감툰: '팔로우하고 햄찌랑 같이 버티기', 정보툰: '저장하고 필요할 때 다시 보기', 심리툰: '친구에게 공유하고 같이 연습하기' };

const SLOT = { L: { x: 60, w: 500, tail: 'bl' }, R: { x: 570, w: 450, tail: 'br' } };

function bubbleLayer([who, text, side]) {
  if (who === 'T') return { type: 'bubble', variant: 'think', text, x: side === 'L' ? 80 : 600, w: 400, sfx: false, _side: side };
  const L = { type: 'bubble', text, ...SLOT[side], _side: side };
  if (who) L.who = who;
  return L;
}
function extraLayer(ex) {
  if (!ex) return null;
  const [k, a, b] = ex;
  if (k === 'b') return { type: 'bubble', who: a, text: b, x: 90, w: 560, tail: 'br' };
  if (k === 'c') return { type: 'card', lines: a, x: 90, w: 520 };
  if (k === 'cap') return { type: 'caption', text: a, x: 90, w: 480 };
  if (k === 'capsub') return { type: 'caption', variant: 'sub', text: a, x: 90, w: 480 };
  throw new Error('extra: ' + k);
}

function build(e) {
  const slides = [];
  const [ct, cs, cscene] = e.cover;
  slides.push({ layout: 'cover', title: ct, sub: cs, art: 'scene:' + cscene, reel: { dur: 2.6, zoom: [1.0, 1.06], focus: [0.5, 0.6], sfx: [['chime', 0.2]] } });
  e.slides.forEach((s, idx) => {
    const last = idx === e.slides.length - 1;
    const [kind, title, scene, ...rest] = s;
    if (kind === 'pn') {
      const [bubbles = [], caption] = rest;
      const layers = bubbles.map(bubbleLayer);
      
      const slide = { title, art: 'scene:' + scene, layers, _limit: last ? 625 : 705 };
      if (last) {
        slide.artBox = { h: 820 };
        if (e.next) layers.push({ type: 'caption', variant: 'sub', text: '다음 편 ▶ ' + e.next, x: 110, y: 1062, w: 860 });
        layers.push({ type: 'cta', text: e.cta, x: 110, y: 1192, w: 860 });
      } else if (caption) layers.push({ type: 'caption', text: caption, x: 120, y: 1196, w: 840, sfx: 'drip' });
      slide.reel = { dur: 2.6 + 0.75 * layers.length, zoom: [1.0, 1.06], focus: [0.5, 0.5] };
      slides.push(slide);
    } else {
      // inf: [lines, extra, note]   cmp: [bad, good, extra, note]
      let main, extra, note;
      if (kind === 'inf') { main = { type: 'card', lines: rest[0], x: 90, y: 270, w: 900 }; extra = rest[1]; note = rest[2]; }
      else { main = { type: 'compare', bad: rest[0], good: rest[1], x: 90, y: 270, w: 900 }; extra = rest[2]; note = rest[3]; }
      const layers = [main];
      const ex = extraLayer(extra);
      if (ex) { ex._below = 0; ex._gap = 46; layers.push(ex); }
      const slide = { layout: 'info', title, art: 'scene:' + scene, artFit: 'meet', layers, _limit: last ? 1050 : 1210 };
      if (last) {
        slide.artBox = { h: 950 };
        layers.push({ type: 'cta', text: e.cta, x: 90, y: note ? 1176 : 1200, w: 900 });
        if (note) layers.push({ type: 'note', text: note, x: 90, y: 1276, w: 900 });
      } else if (note) layers.push({ type: 'note', text: note, x: 90, y: 1240, w: 900 });
      slide.reel = { dur: 4.0, zoom: [1.0, 1.04], focus: [0.5, 0.3] };
      slides.push(slide);
    }
  });
  const tags = [...TAGS[e.type], ...(e.tags || [])];
  return {
    id: 'ep' + String(e.no).padStart(3, '0'),
    no: e.no,
    series: SERIES,
    type: e.type,
    hook: e.hook,
    slides,
    reelEnd: { text: e.next ? '다음 편: ' + e.next : e.endText || '다음 편도 기대해 주세요', cta: END_CTA[e.type], dur: 2.6 },
    badge: e.no >= 23,
    caption: {
      carousel: [e.cap, e.disc ? '※ ' + e.disc : null, CAP_TAIL[e.type]].filter(Boolean).join('\n\n'),
      reel: e.hook.replace('\n', ' ') + ' ' + (e.type === '정보툰' ? '🦉 저장 필수!' : '🐹 공감되면 저장!') + '\n전체 버전은 프로필 게시물에서 👉',
    },
    hashtags: tags,
  };
}

// ── 실제 높이를 재서 _below 레이어의 y를 확정 ──
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SLIDE_W, height: SLIDE_H } });
const warnings = [];
for (const e of EPISODES) {
  if (only.length && !only.includes(e.no)) continue;
  const ep = build(e);
  const p = paletteOf(ep);
  const epDir = resolve(ROOT, 'episodes', ep.id);
  for (const [i, slide] of ep.slides.entries()) {
    for (const L of slide.layers || []) if (L.y == null) L.y = 0;
    await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${fontCss('file://' + ROOT + '/assets/fonts')}
      html,body{margin:0}${slideCss(p)}</style></head><body>${slideHtml(ep, slide, i, { epDir, mode: 'carousel' })}</body></html>`);
    await page.evaluate(() => document.fonts.ready);
    const m = await page.evaluate((i) => {
      const hs = [...document.querySelectorAll('.L')].map((el) => el.getBoundingClientRect().height);
      const t = document.querySelector('.s-title, .s-cover-title');
      return { hs, th: t ? t.getBoundingClientRect().height : 0 };
    }, i);
    // 좌우 말풍선은 엇갈리게, 같은 쪽 말풍선은 아래로 쌓기
    const sideBottom = { L: 0, R: 0 };
    let lastY = null;
    (slide.layers || []).forEach((L, j) => {
      if (L._side) {
        L.y = lastY == null ? 236 : Math.round(Math.max(sideBottom[L._side] + 16, lastY + 96));
        sideBottom[L._side] = L.y + m.hs[j];
        lastY = L.y;
      } else if (L._below != null) L.y = Math.round(slide.layers[L._below].y + m.hs[L._below] + L._gap);
    });
    // 점검: 제목 줄 수, 말풍선·카드가 캐릭터 영역을 침범하는지
    if (slide.layout === 'cover' ? m.th > 250 : m.th > 90) warnings.push(`${ep.id} #${i + 1} 제목이 길어요: ${slide.title.replace('\n', ' / ')}`);
    (slide.layers || []).forEach((L, j) => {
      if (['cta', 'note'].includes(L.type) || (L.type === 'caption' && L.y > 1000)) return;
      const bottom = L.y + m.hs[j];
      if (slide._limit && bottom > slide._limit) warnings.push(`${ep.id} #${i + 1} 레이어${j} 아래로 넘침 (${Math.round(bottom)} > ${slide._limit})`);
    });
    for (const L of slide.layers || []) { delete L._below; delete L._gap; delete L._side; }
    delete slide._limit;
  }
  if (REEL[e.no]) ep.caption.reel = REEL[e.no];
  if (CAROUSEL[e.no]) ep.caption.carousel = CAROUSEL[e.no] + '\n\n' + TAIL[e.type];
  mkdirSync(epDir, { recursive: true });
  writeFileSync(resolve(epDir, 'episode.json'), JSON.stringify(ep, null, 2) + '\n');
  console.log('생성', ep.id, e.type, e.cover[0].replace('\n', ' '));
}
await browser.close();
if (warnings.length) console.log('\n⚠ 점검 필요:\n' + warnings.join('\n'));
