import net from 'node:net'

function findAvailablePort (desiredPort) {
  // eslint-disable-next-line no-new
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, (_err, result) => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
      console.log(port)
    })

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findAvailablePort(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

export { findAvailablePort }

console.log(net)
