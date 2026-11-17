// 사용법: node tools/render-carousel.mjs episodes/ep001
// → episodes/ep001/out/carousel/01.png ... + caption.txt
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium, shoot, ROOT } from './pw.mjs';
import { loadEpisode, slideHtml, slideCss, fontCss, paletteOf, SLIDE_W, SLIDE_H } from './layout.mjs';

const epDir = resolve(process.argv[2] || '');
const ep = loadEpisode(epDir);
const p = paletteOf(ep);
const outDir = resolve(epDir, 'out/carousel');
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SLIDE_W, height: SLIDE_H }, deviceScaleFactor: 1 });
for (const [i, slide] of ep.slides.entries()) {
  const html = `<!doctype html><html><head><meta charset="utf-8"><style>
    ${fontCss('file://' + ROOT + '/assets/fonts')}
    html,body{margin:0;padding:0;width:${SLIDE_W}px;height:${SLIDE_H}px}
    ${slideCss(p)}
  </style></head><body>${slideHtml(ep, slide, i, { epDir, mode: 'carousel' })}</body></html>`;
  const out = resolve(outDir, `${String(i + 1).padStart(2, '0')}.png`);
  await shoot(page, html, out, { width: SLIDE_W, height: SLIDE_H });
  console.log('slide', out.replace(ROOT + '/', ''));
}
await browser.close();

const caption = [ep.caption?.carousel || ep.caption?.text || '', '', (ep.hashtags || []).map((h) => '#' + h).join(' ')].join('\n').trim();
writeFileSync(resolve(epDir, 'out/caption-carousel.txt'), caption + '\n');
if (ep.caption?.reel) writeFileSync(resolve(epDir, 'out/caption-reel.txt'), [ep.caption.reel, '', (ep.hashtags || []).map((h) => '#' + h).join(' ')].join('\n') + '\n');
console.log('캡션 저장 완료');
