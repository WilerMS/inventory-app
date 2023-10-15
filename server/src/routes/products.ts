import { Router } from 'express'

import {
  createNewProduct,
  deleteProduct,
  getProductDetails,
  listAllProducts,
  updateProduct
} from '@/controllers/products'
import { errorHandler } from '@/utils'

const router = Router()

// Rutas
router.get('/', errorHandler(listAllProducts))
router.get('/:productId', errorHandler(getProductDetails))
router.post('/', errorHandler(createNewProduct))
router.put('/:productId', errorHandler(updateProduct))
router.delete('/:productId', errorHandler(deleteProduct))

export default router
