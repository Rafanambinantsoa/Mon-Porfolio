#!/bin/bash
rm -rf node_modules package-lock.json yarn.lock
npm install --no-frozen-lockfile
npx nuxi build --verbose
cp -r .output output
