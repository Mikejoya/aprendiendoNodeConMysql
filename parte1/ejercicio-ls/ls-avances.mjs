//Este codigo se debe manejar asincrono por las funciones del fs.stat.
// import * as fs from 'node:fs';
// import * as path from 'node:path';

// const folder = process.argv[2] ?? '.';

// console.log(folder);
// fs.readdir(folder, (err, files)=> {
//     if(err) {
//         console.log('Error al leer el archivo...', err);
//         process.exit(1);
//     }

//     const filesInfo = files.map(files =>{
//         const folderPath = path.join(folder, files);

//         fs.stat(folderPath, (err, file) => {
//             if(err) {
//                 console.log('error al leer el archivo', err);
//                 process.exit(1);
//             }

//             if(path.extname(files)){
//                 console.log(files, 'colorrrrrr');
//             }else{
//                 console.log(files);
//             }
//             const isDirectory = file.isDirectory();
//             const isFile = isDirectory ? 'd-' : '-'; 
//             const fileSize = file.size;
//             const fileModified = file.mtime.toLocaleString();
//             return`${isFile} ${folderPath} ${fileSize.toString()} ${fileModified}`;
//         });
//     })

//     console.log(filesInfo);

//     filesInfo.forEach(file => {
//         return console.log(file);
//     });
// });

import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import picocolors from 'picocolors';

const folderPath = process.argv[2] ?? '.';

async function ls (folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (err) {
    console.log(picocolors.red('Error el directorio no existe o no se encuentra: '), err);
    process.exit(1)
  }

  const filePromise = files.map(async file => {
    const filePath = path.join(folder, file);
    let stat;

    try {
      stat = await fs.stat(filePath);
    } catch (error) {
      console.log('No se puede leer el archivo: ', filePath );
      process.exit(1);
    }

    const isDirectory = stat.isDirectory();
    const isFile = isDirectory ? picocolors.gray('d-') : picocolors.bgMagenta('f-'); 
    const fileSize = stat.size;
    const fileModified = stat.mtime.toLocaleString();

    return `${isFile} ${picocolors.blue(file.padEnd(20))} ${picocolors.green(fileSize.toString().padEnd(10))} ${picocolors.yellow(fileModified)}`;
  })

  const fileInfo = await Promise.all(filePromise);
  fileInfo.forEach(file => {
    console.log(file);
  })
}

ls(folderPath);
