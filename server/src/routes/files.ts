import { BadRequestError } from '@/errors'
import cloudinary from '@/services/cloudinary'
import { type AuthenticatedRequest } from '@/types'
import { errorHandler } from '@/utils'
import { Router } from 'express'
import fileUpload, { type UploadedFile } from 'express-fileupload'

const router = Router()

// Initializing file upload middleware
router.use('/', fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}))

router.post('/', errorHandler(async (req: AuthenticatedRequest, res) => {
  const file = req.files?.file as UploadedFile

  if (!file) {
    throw new BadRequestError('No file found in request.')
  }

  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    transformation: {
      quality: 50
    }
  })

  return res.json({
    filename: result.secure_url
  })
}))

/*
  !OLD FILE UPLOADER IMPLEMENTATION
  !It uploaded files locally in the sever.

  import multer from 'multer'
  import path from 'path'

  export const upload = multer({ dest: path.resolve(__dirname, '../../public/images') })

  router.post('/', upload.single('file'), errorHandler((req: AuthenticatedRequest, res) => {
    const file = req.file
    if (!file) throw new InternalServerError('File has not been uploaded, please try later')
    res.json(req.file)
  }))

*/

export default router
