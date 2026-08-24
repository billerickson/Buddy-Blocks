#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const [output, reportOutput, hardwareProfile, version, minimumVersion, imagePath, imageUrl,
  notesPath, securityProfile, gitSha, sizeSummaryPath, recoveryPath] = process.argv.slice(2);
const semver = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
if (!output || !reportOutput || !hardwareProfile || !semver.test(version ?? '') ||
    !semver.test(minimumVersion ?? '') || !imagePath || !imageUrl?.startsWith('https://') ||
    !notesPath || !['pilot', 'production'].includes(securityProfile) || !gitSha ||
    !sizeSummaryPath || !recoveryPath) {
  console.error('Invalid firmware release metadata arguments.');
  process.exit(2);
}

const image = readFileSync(imagePath);
const releaseNotes = readFileSync(notesPath, 'utf8').trim();
if (Buffer.byteLength(releaseNotes, 'utf8') > 1000) {
  console.error('Release notes must be at most 1000 UTF-8 bytes.');
  process.exit(2);
}
const sha256 = createHash('sha256').update(image).digest('hex');
const sizeSummary = JSON.parse(readFileSync(sizeSummaryPath, 'utf8'));
const slotBytes = 7 * 1024 * 1024;
const slotThresholdBytes = Math.floor(slotBytes * 0.8);
const staticDramBytes = Number(sizeSummary.dram_data ?? 0) +
  Number(sizeSummary.dram_bss ?? 0) + Number(sizeSummary.diram_data ?? 0) +
  Number(sizeSummary.diram_bss ?? 0);
const manifest = {
  schemaVersion: 1,
  hardwareProfile,
  version,
  minimumVersion,
  url: imageUrl,
  sha256,
  size: image.byteLength,
  releaseNotes,
  mandatory: false,
};
writeFileSync(output, `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 });
writeFileSync(reportOutput, `${JSON.stringify({
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  gitSha,
  securityProfile,
  application: {
    file: basename(imagePath),
    sha256,
    size: image.byteLength,
    slotBytes,
    slotThresholdBytes,
    slotHeadroomBytes: slotBytes - image.byteLength,
    withinSlotThreshold: image.byteLength <= slotThresholdBytes,
  },
  usbRecovery: { file: basename(recoveryPath), size: statSync(recoveryPath).size },
  buildMeasurements: {
    staticDramBytes,
    staticDramIncludes: ['dram_data', 'dram_bss', 'diram_data', 'diram_bss'],
    linkedImageBytes: Number(sizeSummary.total_size ?? 0),
  },
  runtimeMeasurements: {
    internalHeapWatermarkBytes: null,
    psramWatermarkBytes: null,
    filesystemHeadroomBytes: null,
    evidence: 'pending physical board test',
  },
  toolchain: {
    espIdf: '5.5.5',
    lvgl: '9.5.0',
    waveshareBsp: '1.0.1',
    espHosted: '1.4.7',
    espWifiRemote: '0.14.5',
  },
}, null, 2)}\n`, { mode: 0o600 });
