import { type Response } from 'express'

import { type AuthenticatedRequest } from '@/types'
import { Product } from '@/models/Product'
import { InternalServerError, NotFoundError } from '@/errors'

export const listAllProducts = async (req: AuthenticatedRequest, res: Response) => {
  const products = await Product.query().where({ user_id: req.auth?.user.id })
  return res.json(products)
}

export const getProductDetails = async (req: AuthenticatedRequest, res: Response) => {
  const productId = req.params.productId

  const product = await Product.query()
    .findById(productId)
    .where({ user_id: req.auth?.user.id })

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  return res.json(product)
}

export const createNewProduct = async (req: AuthenticatedRequest, res: Response) => {
  const product = await Product.query()
    .insert({
      ...req.body,
      user_id: req.auth?.user.id
    })

  return res.json(product)
}

export const updateProduct = async (req: AuthenticatedRequest, res: Response) => {
  const productId = req.params.productId

  const product = await Product.query()
    .findById(productId)
    .where({ user_id: req.auth?.user.id })
    .patch(req.body)
    .returning('*')

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  return res.json(product)
}

export const deleteProduct = async (req: AuthenticatedRequest, res: Response) => {
  const productId = req.params.productId

  const product = await Product.query()
    .findById(productId)
    .where({ user_id: req.auth?.user.id })

  if (!product) {
    throw new NotFoundError('Product not found')
  }

  const deletedCount = await Product.query().deleteById(productId)

  if (deletedCount === 0) {
    throw new InternalServerError('Product was not deleted. Please, contact the admin')
  }

  return res.status(204).send()
}
