# Versioning in NPM package.json

Eg. express: "^4.19.2"

4 => Major version => breaking changes (when update has breaking changes)
19 => Minor version => New feature but backward compatible
2 => Patch version => New patch update / bug fixes

## ^ caret vs ~ tilde

caret ^ : Update version to latest 4.x.x BOTH Patch & Minor version updates will auto update
Tilde ~ : Update version to latest 4.19.x Only Patch version updates will auto update
