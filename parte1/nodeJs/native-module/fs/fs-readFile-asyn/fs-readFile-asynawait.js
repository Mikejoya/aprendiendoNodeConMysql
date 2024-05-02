const {readFile} = require('node:fs/promises');

//recordar que existe una version paralela esta en la que estamos es asincrono y el otro archivo es igual pero con epmaScriptm2015

(async()=>{
    const text = await readFile('../algo.txt', 'utf8', (err, data) => {
        try{
            console.log(data);
        }catch(e){
            console.log(e, err);
        }
    });
    console.log(text);
})()

