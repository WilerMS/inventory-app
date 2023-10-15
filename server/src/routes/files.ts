import { InternalServerError } from '@/errors'
import { errorHandler } from '@/utils'
import { Router } from 'express'
import multer from 'multer'
import path from 'path'

const router = Router()
const upload = multer({ dest: path.resolve(__dirname, '../../public/images') })

router.post('/', upload.single('file'), errorHandler((req, res) => {
  const file = req.file
  if (!file) throw new InternalServerError('File has not been uploaded, please try later')
  res.send(file.filename)
}))

export default router
