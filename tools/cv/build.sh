#!/bin/sh
# Rebuild the downloadable CV from tools/cv/cv.html with headless Chrome (A4, Charter).
set -e
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
"$CHROME" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="$PWD/cv.pdf" "file://$PWD/cv.html"
cp cv.pdf ../../public/cv_gokdeniz.pdf
cp cv.pdf ../../cv_gokdeniz.pdf
rm cv.pdf
echo "Updated public/cv_gokdeniz.pdf and cv_gokdeniz.pdf"
