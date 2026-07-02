import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const chromeCandidates = [
  process.env.CHROME_BIN,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  'google-chrome',
  'chromium',
  'chromium-browser',
].filter(Boolean);

const chrome = chromeCandidates.find((candidate) => {
  if (!candidate) return false;
  if (candidate.includes('/')) return existsSync(candidate);
  try {
    execFileSync('which', [candidate], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
});

if (!chrome) {
  throw new Error('Chrome or Chromium was not found. Set CHROME_BIN to render OG images.');
}

const htmlPath = path.join(root, 'public/og/options.html');
const outputDir = path.join(root, 'public/og');
mkdirSync(outputDir, { recursive: true });

for (const option of [1, 2, 3]) {
  const outputPath = path.join(outputDir, `buddy-blocks-option-${option}.png`);
  const url = `${pathToFileURL(htmlPath).href}?option=${option}`;
  execFileSync(
    chrome,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--window-size=1200,675',
      '--virtual-time-budget=4000',
      '--run-all-compositor-stages-before-draw',
      `--screenshot=${outputPath}`,
      url,
    ],
    { stdio: 'inherit' },
  );
  console.log(`Rendered ${path.relative(root, outputPath)}`);
}
