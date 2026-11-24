#!/usr/bin/env bash
# 한 번에: 캐러셀 PNG + 캡션 + 릴스 MP4 + 릴스 커버
# 사용법: ./tools/make-episode.sh episodes/ep001 [--music bgm.mp3]
set -euo pipefail
cd "$(dirname "$0")/.."
EP="$1"; shift || true
node tools/render-carousel.mjs "$EP"
node tools/build-reel.mjs "$EP" "$@"
# 릴스 커버: 프로필 격자(가운데 3:4)와 피드(가운데 4:5)에서 잘려도 제목이 다 보이는 전용 이미지
node tools/make-cover.mjs "$EP"
echo "완료 → $EP/out/ (carousel/, reel.mp4, reel-cover.png, caption-*.txt)"
