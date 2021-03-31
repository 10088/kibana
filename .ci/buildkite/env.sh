#!/usr/bin/env bash

set -euo pipefail

export CI=true

export KIBANA_DIR=$(pwd)
export XPACK_DIR="$KIBANA_DIR/x-pack"

export CACHE_DIR="$HOME/.kibana"
export PARENT_DIR="$(cd "$KIBANA_DIR/.."; pwd)"
export WORKSPACE="${WORKSPACE:-$PARENT_DIR}"

export KIBANA_PKG_BRANCH="$(jq -r .branch "$KIBANA_DIR/package.json")"
export KIBANA_BASE_BRANCH="$KIBANA_PKG_BRANCH"

export GECKODRIVER_CDNURL="https://us-central1-elastic-kibana-184716.cloudfunctions.net/kibana-ci-proxy-cache"
export CHROMEDRIVER_CDNURL="https://us-central1-elastic-kibana-184716.cloudfunctions.net/kibana-ci-proxy-cache"
export RE2_DOWNLOAD_MIRROR="https://us-central1-elastic-kibana-184716.cloudfunctions.net/kibana-ci-proxy-cache"
export CYPRESS_DOWNLOAD_MIRROR="https://us-central1-elastic-kibana-184716.cloudfunctions.net/kibana-ci-proxy-cache/cypress"

export NODE_OPTIONS="--max-old-space-size=4096"

export FORCE_COLOR=1
export TEST_BROWSER_HEADLESS=1

export ELASTIC_APM_ENVIRONMENT=ci
export ELASTIC_APM_TRANSACTION_SAMPLE_RATE=0.1

export ELASTIC_APM_ACTIVE=false
export CHECKS_REPORTER_ACTIVE=false

export FLEET_PACKAGE_REGISTRY_PORT=6104
export TEST_CORS_SERVER_PORT=6105

export DETECT_CHROMEDRIVER_VERSION=true
export CHROMEDRIVER_FORCE_DOWNLOAD=true

export GCS_UPLOAD_PREFIX=asihdauishd98u42589

# TODO
export NODE_VERSION=14.16.0

export DEFAULT_BUILD_LOCATION="$WORKSPACE/kibana-build-xpack"

if [[ "$BUILD_TS_REFS_CACHE_ENABLE" != "true" ]]; then
  export BUILD_TS_REFS_CACHE_ENABLE=false
fi
