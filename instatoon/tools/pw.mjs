// Playwright 로더 + HTML→PNG 헬퍼
// 전역 설치(NODE_PATH)와 로컬 설치를 모두 지원합니다.
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
export const { chromium } = require('playwright');
export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** HTML을 임시 파일로 저장한 뒤 file:// 로 열어 스크린샷 (로컬 폰트·이미지 로딩 보장) */
export async function shoot(page, html, outPath, { width, height, fullPage = false } = {}) {
  const tmpDir = resolve(ROOT, '.cache');
  mkdirSync(tmpDir, { recursive: true });
  const tmp = resolve(tmpDir, `render-${process.pid}.html`);
  writeFileSync(tmp, html);
  if (width && height) await page.setViewportSize({ width, height });
  await page.goto('file://' + tmp);
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.images].map((i) => (i.complete ? 1 : new Promise((r) => (i.onload = i.onerror = r)))));
  });
  if (fullPage) {
    const h = await page.evaluate(() => document.body.scrollHeight);
    await page.setViewportSize({ width, height: h });
  }
  mkdirSync(dirname(outPath), { recursive: true });
  await page.screenshot({ path: outPath });
}
