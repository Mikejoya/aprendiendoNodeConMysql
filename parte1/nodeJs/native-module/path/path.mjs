import * as path from 'node:path';

// path.sep se utiliza para identificar el tipo de barras que utiliza el sistema operativo que estamos utilizando.

console.log(path.sep);


const pathJoin = path.join('.', 'hola','midudev', 'en', 'twitch');

console.log(pathJoin);


const pathNameFile = path.basename('./con/la/config/file.txt');
const pathNameFileRemoveExtend = path.basename('./con/la/config/file.txt', '.txt');

console.log(pathNameFile);
console.log(pathNameFileRemoveExtend);


const extend = path.extname('mian.html');

console.log(extend);