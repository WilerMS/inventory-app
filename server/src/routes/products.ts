import { Router } from 'express'
import {
  createNewProduct,
  deleteProduct,
  getProductDetails,
  listAllProducts,
  updateProduct
} from '@/controllers/products'

const router = Router()

// Rutas
router.get('/', listAllProducts)
router.get('/:productId', getProductDetails)
router.post('/', createNewProduct)
router.put('/:productId', updateProduct)
router.delete('/:productId', deleteProduct)

export default router
