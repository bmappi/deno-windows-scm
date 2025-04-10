import {
    dirname,
    join,
} from 'node:path';
import { fileURLToPath } from 'node:url';

// const path = require("path");

const dirPath = dirname(dirname(fileURLToPath(import.meta.url)));
const filePath = join(dirPath, "ts/worker/winscmWorker.js");

const jsContent = Deno.readFileSync(filePath, "utf8");
const base64Content = btoa(jsContent);

const dataUri = `data:application/javascript;base64,${base64Content}`;

console.log(dataUri);