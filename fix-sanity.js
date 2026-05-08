const fs = require('fs');
const path = require('path');

const filesToPatch = [
  'node_modules/sanity/lib/_chunks-es/presentation.js',
  'node_modules/sanity/lib/_chunks-es/LiveQueries.js',
  'node_modules/sanity/lib/_chunks-es/PresentationToolGrantsCheck.js',
  'node_modules/sanity/lib/_chunks-es/structureTool.js',
  'node_modules/sanity/lib/index.js'
];

const polyfillCode = `
import { useRef as __useRef, useEffect as __useEffect, useCallback as __useCallback } from 'react';
const useEffectEvent = (fn) => {
  const ref = __useRef(fn);
  __useEffect(() => {
    ref.current = fn;
  });
  return __useCallback((...args) => {
    const latestFn = ref.current;
    return latestFn(...args);
  }, []);
};
`;

function patchFile(filePath) {
  const absolutePath = path.resolve(__dirname, filePath);
  if (!fs.existsSync(absolutePath)) {
    console.log(`File not found: ${filePath} - skipping`);
    return;
  }

  let content = fs.readFileSync(absolutePath, 'utf8');

  // Skip if already patched
  if (content.includes('const useEffectEvent = (fn) =>')) {
    console.log(`Already patched: ${filePath}`);
    return;
  }

  // Strip useEffectEvent from imports
  let cleaned = content;
  cleaned = cleaned.replace(/,\s*useEffectEvent\s*,/g, ',');
  cleaned = cleaned.replace(/,\s*useEffectEvent\s*\}/g, ' }');
  cleaned = cleaned.replace(/\{\s*useEffectEvent\s*,/g, '{');
  cleaned = cleaned.replace(/\{\s*useEffectEvent\s*\}/g, '{ }');

  // Prepend polyfill
  cleaned = polyfillCode + '\n' + cleaned;

  fs.writeFileSync(absolutePath, cleaned, 'utf8');
  console.log(`Successfully patched: ${filePath}`);
}

console.log('Running sanity-useEffectEvent-polyfill patch...');
filesToPatch.forEach(patchFile);
console.log('Sanity patch complete!');
