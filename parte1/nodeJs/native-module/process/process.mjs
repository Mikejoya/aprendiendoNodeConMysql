// Argumentos de entrada...

console.log(process.argv)

// Controlar eventos

process.on('exit', (event) => {
  console.log(event)
})

// Nos indica desde que posicion del sistema estamos ejecutando el proceso

console.log(process.cwd())

// Importante el manejo de variables de entorno

console.log(process.env.NODE_ENV)

// Salida del proceso...

process.exit(0)
