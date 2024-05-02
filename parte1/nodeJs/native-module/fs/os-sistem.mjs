import { platform, release, arch, cpus, freemem, totalmem, uptime } from 'node:os';

console.log("sistema operartivo: ", platform());
console.log("Version de sistema operativo: ", release());
console.log("Arqutectura: ", arch());
console.log("Cpu's: ", cpus());
console.log("Memoria libre: ", freemem()/ 1024 / 1024);
console.log("Memoria total: ", totalmem()/ 1024 / 1024);
console.log("uptime: ", uptime() / 60 / 60);