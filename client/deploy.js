import { Client } from 'basic-ftp'
import ora from 'ora'
import 'dotenv/config'

// Env variables
const FTP_HOST = process.env.FTP_HOST
const FTP_USER = process.env.FTP_USER
const FTP_PASSWORD = process.env.FTP_PASSWORD

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function uploadFiles() {
  const client = new Client()
  const spinner = ora()

  try {
    spinner.start('Starting FTP server deploy...')
    spinner.succeed('Started FTP server deployment.')

    await delay(2000)

    spinner.start('Attempting to connect to the FTP server...')

    await client.access({
      host: FTP_HOST,
      user: FTP_USER,
      password: FTP_PASSWORD,
    })

    spinner.succeed('Connection to the FTP server established successfully.')
    spinner.start('Initiating deletion of all files on the remote server...')

    await client.clearWorkingDir()

    spinner.succeed('Deletion of all files on the remote server completed successfully.')
    spinner.start('Beginning the upload of the application to the server.')

    await client.uploadFromDir('dist')

    spinner.succeed('The application has been uploaded to the server successfully.')
  } catch (err) {
    spinner.fail('An error was encountered. Refer to the information below:')
    console.error(err)
  } finally {
    spinner.info('Terminating the connection to the FTP server.')
    client.close()
  }
}

uploadFiles()
