// captions.mjs 의 문구를 각 편의 episode.json 과 out/caption-*.txt 에 반영합니다. (다시 렌더링할 필요 없음)
// 사용법: node tools/write-captions.mjs
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { ROOT } from './pw.mjs';
import { REEL, CAROUSEL, TAIL } from '../captions.mjs';

const targets = [...Array.from({ length: 30 }, (_, i) => [i + 1, `episodes/ep${String(i + 1).padStart(3, '0')}`]), ['jp001', 'jobposts/jp001']];
for (const [key, dir] of targets) {
  const f = resolve(ROOT, dir, 'episode.json');
  if (!existsSync(f)) continue;
  const ep = JSON.parse(readFileSync(f, 'utf8'));
  const tags = (ep.hashtags || []).map((h) => '#' + h).join(' ');
  ep.caption = ep.caption || {};
  if (REEL[key]) ep.caption.reel = REEL[key];
  if (CAROUSEL[key]) ep.caption.carousel = CAROUSEL[key] + '\n\n' + TAIL[ep.type];
  writeFileSync(f, JSON.stringify(ep, null, 2) + '\n');
  const out = resolve(ROOT, dir, 'out');
  mkdirSync(out, { recursive: true });
  writeFileSync(resolve(out, 'caption-reel.txt'), ep.caption.reel + '\n\n' + tags + '\n');
  writeFileSync(resolve(out, 'caption-carousel.txt'), ep.caption.carousel + '\n\n' + tags + '\n');
}
console.log('캡션 반영 완료');
