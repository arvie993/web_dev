/* 
1. Use the inquirer npm package to get user input (only if no CLI arg provided).
2. Use the qr-image npm package to turn the user entered (or provided) URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
4. Support: node index.js <url> for non-interactive usage (e.g. node index.js www.bing.com)
*/

import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

// Helper to normalize a URL (prepend https:// if missing protocol)
function normalizeUrl(raw) {
  if (!raw) return raw;
  if (!/^https?:\/\//i.test(raw)) {
    return 'https://' + raw; // default to https
  }
  return raw;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a short base filename derived from the URL's primary domain (strip www, keep first label)
// Format: qr-<domain>-<rnd>.png  e.g. www.bing.com -> qr-bing-a1b.png
function urlBasedName(normalizedUrl) {
  try {
    const u = new URL(normalizedUrl);
    let host = u.host.toLowerCase();
    host = host.replace(/^www\./, '');
    const primary = host.split('.')[0] || 'site';
    const cleaned = primary.replace(/[^a-z0-9]/g, '').slice(0, 12) || 'site';
    const rand = Math.random().toString(36).slice(2, 5); // 3 chars for brevity
    return `qr-${cleaned}-${rand}`;
  } catch {
    const rand = Math.random().toString(36).slice(2, 5);
    return `qr-site-${rand}`;
  }
}

function generateQr(url) {
  const normalized = normalizeUrl(url.trim());
  const outBase = urlBasedName(normalized);
  const pngName = path.join(__dirname, `${outBase}.png`);
  const textName = path.join(__dirname, `${outBase}.txt`);

  const qrCodeImage = qr.image(normalized, { type: 'png' });
  const writeStream = fs.createWriteStream(pngName);
  qrCodeImage.pipe(writeStream);

  writeStream.on('finish', () => {
  console.log(`QR code image saved to ${pngName}`);
  });

  fs.writeFile(textName, normalized, (err) => {
    if (err) {
      console.error('Error writing URL to file:', err);
    } else {
  console.log(`URL saved to ${textName}`);
    }
  });
}

async function main() {
  const cliUrl = process.argv[2];
  if (cliUrl) {
    generateQr(cliUrl);
    return;
  }

  try {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'url',
        message: 'Enter a URL to generate a QR code:',
        validate: (input) => !!input.trim() || 'Please enter a URL',
      },
    ]);
    generateQr(answers.url);
  } catch (error) {
    console.error('Error during inquirer prompt:', error);
  }
}

main();
