import { ConflictError, InternalServerError } from '@/errors'
import { User } from '@/models/User'
import { type AuthenticatedRequest } from '@/types'
import { errorHandler } from '@/utils'
import { Router } from 'express'
import multer from 'multer'
import path from 'path'

const router = Router()
export const upload = multer({ dest: path.resolve(__dirname, '../../public/images') })

router.post('/', upload.single('file'), errorHandler((req: AuthenticatedRequest, res) => {
  const file = req.file
  if (!file) throw new InternalServerError('File has not been uploaded, please try later')
  res.json(req.file)
}))

router.put(
  '/user-photo',
  upload.single('file'),
  errorHandler(async (req: AuthenticatedRequest, res) => {
    // @ts-expect-error
    const { id } = req.auth.user

    const file = req.file
    if (!file) throw new InternalServerError('File has not been uploaded, please try later')

    const existingUser = await User.query().findById(id)
    if (!existingUser) {
      throw new ConflictError('User not found')
    }

    await User
      .query()
      .findById(id)
      .patch({ image: file.filename })

    const updatedUser = await User.query().findById(id) as User

    return res.json({
      message: 'Image successfully updated',
      user: updatedUser.toResponse()
    })
  })
)

export default router
