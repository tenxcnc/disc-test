// 슬라이드 레이아웃: 캐러셀(PNG)과 릴스툰(MP4)이 똑같이 사용하는 공용 렌더러.
// 좌표계는 슬라이드 1080×1350(인스타 4:5 세로형) 기준입니다.
import { existsSync, readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';
import { sceneSvg } from './scenes.mjs';
import { PALETTE } from './characters.mjs';

export const SLIDE_W = 1080;
export const SLIDE_H = 1350;

const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

/** 레이아웃별 그림 카드 영역 */
const ART_BOX = {
  cover: { x: 50, y: 470, w: 980, h: 830 },
  panel: { x: 50, y: 210, w: 980, h: 960 },
  info: { x: 50, y: 210, w: 980, h: 1090 },
};

export function paletteOf(ep) {
  return { ...PALETTE, ...(ep.palette || {}) };
}

export function fontCss(fontBase) {
  return `
  @font-face{font-family:Jua;src:url('${fontBase}/Jua-Regular.ttf')}
  @font-face{font-family:Gowun;src:url('${fontBase}/GowunDodum-Regular.ttf')}`;
}

/** 공용 CSS. 슬라이드 루트는 .slide (1080×1350) */
export function slideCss(p) {
  return `
  .slide{position:relative;width:${SLIDE_W}px;height:${SLIDE_H}px;overflow:hidden;font-family:Jua,sans-serif;color:${p.ink};word-break:keep-all;
    background:linear-gradient(180deg,${p.bg} 0%,#FFFBE3 100%)}
  .slide *{box-sizing:border-box}
  .s-title{position:absolute;left:60px;right:60px;top:70px;text-align:center;font-size:68px;line-height:1.15;letter-spacing:-1px}
  .s-series{position:absolute;left:50%;top:64px;transform:translateX(-50%);background:${p.accent};color:#fff;font-size:34px;
    padding:10px 30px;border-radius:999px;white-space:nowrap}
  .s-cover-title{position:absolute;left:50px;right:50px;top:132px;text-align:center;font-size:104px;line-height:1.12;letter-spacing:-2px}
  .s-cover-sub{position:absolute;left:60px;right:60px;top:392px;text-align:center;font-size:42px;opacity:.75}
  .s-art{position:absolute;background:#fff;border-radius:48px;overflow:hidden;box-shadow:0 12px 0 ${p.bg2};border:5px solid ${p.bg2}}
  .s-art.bare{background:transparent;box-shadow:none}
  .s-art svg,.s-art img{width:100%;height:100%;display:block;object-fit:cover}
  .L{position:absolute}
  .bubble{background:${p.bubble};border:6px solid ${p.line};border-radius:46px;padding:22px 30px;font-size:46px;line-height:1.28;text-align:center}
  .bubble.think{border-style:dashed}
  .bubble .tail{position:absolute;width:38px;height:38px;background:${p.bubble};transform:rotate(45deg)}
  .bubble .tail.bl,.bubble .tail.br{bottom:-23px;border-right:6px solid ${p.line};border-bottom:6px solid ${p.line}}
  .bubble .tail.tl,.bubble .tail.tr{top:-23px;border-left:6px solid ${p.line};border-top:6px solid ${p.line}}
  .bubble .tail.bl,.bubble .tail.tl{left:70px}.bubble .tail.br,.bubble .tail.tr{right:70px}
  .bubble.think .tail{display:none}
  .who{display:block;font-size:30px;opacity:.6;margin-bottom:4px}
  .caption{background:${p.accent};color:#fff;box-shadow:0 6px 0 rgba(0,0,0,.10);border-radius:999px;padding:18px 34px;font-size:44px;text-align:center;line-height:1.25}
  .caption.sub{background:${p.sub}}
  .card{background:#fff;border-radius:36px;padding:32px 40px;font-size:48px;line-height:1.45;box-shadow:0 8px 0 ${p.bg2};border:4px solid ${p.bg2}}
  .card .k{color:${p.accent}}
  .card.plain{font-family:Gowun,sans-serif;font-size:40px;box-shadow:none;border:none;background:transparent;padding:0}
  .compare{display:flex;flex-direction:column;gap:18px}
  .compare .row{border-radius:30px;padding:24px 30px 24px 100px;font-size:45px;line-height:1.35;position:relative}
  .compare .row b{position:absolute;left:28px;top:50%;transform:translateY(-50%);width:54px;height:54px;border-radius:50%;
    color:#fff;font-weight:400;font-size:36px;display:flex;align-items:center;justify-content:center}
  .compare .bad{background:#F3F1EC;color:#8B8178}.compare .bad b{background:#C4BBB2}
  .compare .good{background:#FFF8EE;border:5px solid ${p.accent}}.compare .good b{background:${p.accent}}
  .note{font-family:Gowun,sans-serif;font-size:28px;opacity:.7;text-align:center}
  .mail{font-family:Gowun,sans-serif;font-size:40px;line-height:1.55;color:#333}
  .mail .from{font-size:30px;color:#7B8794;margin-bottom:10px}
  .cta{background:${p.cta || p.ink};color:#fff;box-shadow:0 6px 0 rgba(0,0,0,.12);border-radius:999px;padding:18px 30px;font-size:40px;text-align:center}
  `;
}

function artHtml(slide, epDir, mode) {
  if (!slide.art) return '';
  const box = { ...ART_BOX[slide.layout || 'panel'], ...(slide.artBox || {}) };
  let inner;
  if (slide.art.startsWith('scene:')) {
    inner = `<svg viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid ${slide.artFit || 'slice'}">${sceneSvg(slide.art.slice(6))}</svg>`;
  } else {
    // 살구salgu 등 외부 이미지: 캐러셀은 상대경로, 릴스 빌드는 assets/ 로 복사
    const src = mode === 'reel' ? `assets/panels/${slide.art.split('/').pop()}` : resolve(epDir, slide.art);
    if (mode !== 'reel' && !existsSync(src)) throw new Error(`이미지 없음: ${src}`);
    inner = `<img src="${mode === 'reel' ? src : 'file://' + src}" alt="">`;
  }
  return `<div class="s-art ${slide.artBare ? 'bare' : ''}" style="left:${box.x}px;top:${box.y}px;width:${box.w}px;height:${box.h}px">${inner}</div>`;
}

function layerHtml(L, i, slideIdx) {
  const pos = `left:${L.x}px;top:${L.y}px;${L.w ? `width:${L.w}px;` : ''}`;
  const id = `L${slideIdx}_${i}`;
  const attrs = `id="${id}" class="L ${L.type}${L.variant ? ' ' + L.variant : ''}" style="${pos}"`;
  switch (L.type) {
    case 'bubble':
      return `<div ${attrs}>${L.who ? `<span class="who">${esc(L.who)}</span>` : ''}${esc(L.text)}${
        L.tail && L.tail !== 'none' ? `<i class="tail ${L.tail}"></i>` : ''
      }</div>`;
    case 'card':
      return `<div ${attrs}>${(L.lines || [L.text]).map((t) => `<div>${esc(t).replace(/\[(.+?)\]/g, '<span class="k">$1</span>')}</div>`).join('')}</div>`;
    case 'compare':
      return `<div ${attrs}><div class="row bad"><b>×</b>${esc(L.bad)}</div><div class="row good"><b>○</b>${esc(L.good)}</div></div>`;
    case 'mail':
      return `<div ${attrs}>${L.from ? `<div class="from">${esc(L.from)}</div>` : ''}${esc(L.text)}</div>`;
    default:
      return `<div ${attrs}>${esc(L.text)}</div>`;
  }
}

/** 슬라이드 내부 HTML (루트 .slide 포함). mode: 'carousel' | 'reel' */
export function slideHtml(ep, slide, idx, { epDir, mode = 'carousel' } = {}) {
  const head =
    slide.layout === 'cover'
      ? `${ep.series && mode !== 'reel' ? `<div class="s-series">${esc(ep.series)}${ep.no ? ` EP.${String(ep.no).padStart(2, '0')}` : ''}</div>` : ''}
         <div class="s-cover-title">${esc(slide.title)}</div>${slide.sub ? `<div class="s-cover-sub">${esc(slide.sub)}</div>` : ''}`
      : `<div class="s-title">${esc(slide.title || '')}</div>`;
  const layers = (slide.layers || []).map((L, i) => layerHtml(L, i, idx)).join('');
  return `<div class="slide" id="S${idx}">${artHtml(slide, epDir, mode)}${head}${layers}</div>`;
}

export function loadEpisode(epDir) {
  const ep = JSON.parse(readFileSync(resolve(epDir, 'episode.json'), 'utf8'));
  if (!Array.isArray(ep.slides) || !ep.slides.length) throw new Error('episode.json 에 slides 가 없습니다');
  return ep;
}

export const isImage = (p) => ['.png', '.jpg', '.jpeg', '.webp'].includes(extname(p).toLowerCase());
