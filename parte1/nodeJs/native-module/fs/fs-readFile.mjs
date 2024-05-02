import * as fs from 'node:fs';
//siempre se podra uasar el promise para no ejecutar callback

// ademas siempre que necesite pasar tambien a promesa puede usar el promisify de node:util



//Forma sincrona de lectura...
const text = fs.readFileSync('./algo.txt', 'utf8');

const text2 = fs.readFileSync('./algo2.txt', 'utf8');

console.log(text);
console.log(text2);

//Forma asincrona de lectura...


fs.readFile('./algo.txt', 'utf8', (err, data) => {
    try {
        console.log(data);
    } catch (e) {
        console.log(e, `${err} al ejecutar`);
    }
});