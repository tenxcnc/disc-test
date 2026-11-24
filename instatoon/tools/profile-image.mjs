// 인스타그램 프로필 이미지(1080×1080, 원형으로 잘려도 얼굴이 다 보이게 배치)
import { resolve } from 'node:path';
import { chromium, shoot, ROOT } from './pw.mjs';
import { hamzzi, PALETTE } from './characters.mjs';
const browser = await chromium.launch();
const page = await browser.newPage();
await shoot(page, `<body style="margin:0;width:1080px;height:1080px;background:radial-gradient(circle at 50% 35%, #FFF7C9 0%, ${PALETTE.bg2} 75%)">
  <svg viewBox="-70 -85 540 540" width="1080" height="1080">${hamzzi({ expr: 'happy' })}</svg></body>`, resolve(ROOT, 'characters/profile.png'), { width: 1080, height: 1080 });
await browser.close(); console.log('saved characters/profile.png');
