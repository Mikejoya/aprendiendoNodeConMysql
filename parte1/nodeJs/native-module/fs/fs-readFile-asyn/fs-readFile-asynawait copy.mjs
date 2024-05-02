import { readFile } from 'node:fs/promises';

const text = await readFile('../algo.txt', 'utf8', (err, data) => {
    try{
        console.log(data);
    }catch(e){
        console.log(e, err);
    }
});

console.log(text);