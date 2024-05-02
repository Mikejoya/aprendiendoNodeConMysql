import * as fs from 'node:fs';


if(fs.existsSync('./index.mjs')) {
    console.log('No existe el archivo...');
}

fs.readdir('../nodeJS', (err, files)=> {
    if (err) {
        console.log('Error al leer el archivo: ', err);
        return;
    }

    files.forEach(file => {
        console.log(file);
    });
});