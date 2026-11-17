#!/usr/bin/env bash
# 한 번에: 캐러셀 PNG + 캡션 + 릴스 MP4 + 릴스 커버
# 사용법: ./tools/make-episode.sh episodes/ep001 [--music bgm.mp3]
set -euo pipefail
cd "$(dirname "$0")/.."
EP="$1"; shift || true
node tools/render-carousel.mjs "$EP"
node tools/build-reel.mjs "$EP" "$@"
# 릴스 커버(프로필 그리드용 3:4 크롭 기준 1080x1440) — 표지 슬라이드를 세로 캔버스에 배치
ffmpeg -hide_banner -loglevel error -y -ss 1.2 -i "$EP/out/reel.mp4" -frames:v 1 "$EP/out/reel-cover.png"
echo "완료 → $EP/out/ (carousel/, reel.mp4, reel-cover.png, caption-*.txt)"
