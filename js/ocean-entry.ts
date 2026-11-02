import { OceanEngine } from './vendor/ascii-sharks/engine';

const canvas = document.getElementById('ascii-ocean-bg') as HTMLCanvasElement;
const mobile = window.matchMedia('(max-width: 650px)').matches;
if (canvas && canvas.getContext('2d')) {
  new OceanEngine(canvas, mobile
    ? [{ kind: 'classic', size: 0.9 }, { kind: 'hammerhead', size: 0.7 }]
    : [{ kind: 'classic', size: 1 }, { kind: 'hammerhead', size: 0.85 }, { kind: 'mako', size: 0.75 }]);
}
