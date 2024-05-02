import * as fs from 'node:fs';

const stats = fs.statSync('./algo.txt');


console.log(
    stats.isFile(),
    stats.isDirectory(),
    stats.isSymbolicLink(),
    stats.size

);