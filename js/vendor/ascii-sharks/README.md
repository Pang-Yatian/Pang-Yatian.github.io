# ASCII Sharks

Source: https://github.com/stackedlol/ascii-sharks
Upstream commit: a0074c16a106f0abc665fe9712ca445f8f98ad8e
Copyright (c) 2026 drewdi. Distributed under the adjacent MIT LICENSE.

Local adaptation: transparent canvas background, square cells without text glyphs, and green shading matched to the portfolio accent (#76B900). Fish and wakes also use green squares.
The shark geometry, swimming simulation, fish schools, and wakes are based on upstream code; the local renderer preserves animated shading with smooth light variation.

Rebuild the browser bundle from the repository root:

Requires Node.js 22.13+ (no npm dependencies).

```sh
node scripts/build-ocean.mjs
```
