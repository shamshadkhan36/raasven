import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDist = path.join(__dirname, '..', 'client', 'dist');
const rootDist = path.join(__dirname, '..', 'dist');

if (fs.existsSync(clientDist)) {
  fs.cpSync(clientDist, rootDist, { recursive: true, force: true });
  console.log('✓ Successfully copied client/dist to root dist/');
}
