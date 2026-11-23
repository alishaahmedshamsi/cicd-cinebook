#!/usr/bin/env bash
# Packages the app into build-v<VERSION>.zip
set -euo pipefail

VERSION="${VERSION:-1.0.0-local}"
COMMIT="${COMMIT:-$(git rev-parse HEAD 2>/dev/null || echo local)}"

rm -rf dist && mkdir -p dist
cp src/*.html src/*.css src/*.js dist/

cat > dist/build-info.json <<EOF
{ "version": "${VERSION}", "commit": "${COMMIT}", "builtAt": "$(date -u +%Y-%m-%dT%H:%M:%SZ)" }
EOF

ZIP="build-v${VERSION}.zip"
rm -f build-v*.zip
(cd dist && zip -qr "../${ZIP}" .)
echo "Built ${ZIP}"
ls -la "${ZIP}"
