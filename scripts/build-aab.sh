#!/usr/bin/env bash
# ==============================================================================
# Script to build Android App Bundle (.aab) for Virat Maths Academy
# Package Name: com.viratmathsacademy.app
# Target Host: ais-pre-bvm4l3uzdxsaajuxzpwmgh-694768886112.asia-east1.run.app
# ==============================================================================

set -e

echo "=== Virat Maths Academy - Android App Bundle (.aab) Generator ==="

# Option 1: Build via Android Gradle project
if [ -d "android" ]; then
  echo "--> Found native Android Gradle project in ./android"
  echo "--> Running Gradle release bundle build..."
  cd android
  if [ -f "./gradlew" ]; then
    ./gradlew bundleRelease
  else
    gradle bundleRelease
  fi
  echo "--> Release AAB generated at: android/app/build/outputs/bundle/release/app-release.aab"
  exit 0
fi

# Option 2: Build via Bubblewrap CLI
echo "--> Building via Bubblewrap CLI..."
npx @bubblewrap/cli build
echo "--> AAB release bundle created successfully!"
