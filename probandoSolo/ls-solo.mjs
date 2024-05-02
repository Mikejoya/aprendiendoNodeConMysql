import * as fs from 'node:fs/promises'
import path from 'node:path'

const folderPath = process.argv[2] ?? '.'

async function ls (folder) {
  let files
  try {
    // eslint-disable-next-line no-unused-vars
    files = await fs.readdir(folder)
  } catch (err) {
    console.log('El archivo no existe...', err)
    process.close(1)
  }

  console.log(files)

  const folderPromise = files.map(async file => {
    console.log('GGGGGGGG', folder)
    const filePath = path.join(folder, file)
    console.log(filePath)

    let stat
    try {
      stat = await fs.stat(filePath)
    } catch (err) {
      console.log('Error al leer los archivos...', err)
      process.close(1)
    }

    const isDirectory = stat.isDirectory()
    const isFile = isDirectory ? '-d' : '--f'
    const size = stat.size
    const fileModified = stat.mtime.toLocaleString()

    return `${isFile} ${file} ${size} ${fileModified}`
  })

  const filePath = await Promise.all(folderPromise)
  filePath.forEach(file => {
    console.log(file)
  })
}

ls(folderPath)
