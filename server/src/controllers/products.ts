import { type Request, type Response } from 'express'

export const listAllProducts = (req: Request, res: Response) => {
  res.send('Listar todos los productos')
}

export const getProductDetails = (req: Request, res: Response) => {
  const productId = req.params.productId
  res.send(`Detalles del producto con ID: ${productId}`)
}

export const createNewProduct = (req: Request, res: Response) => {
  res.send('Crear un nuevo producto')
}

export const updateProduct = (req: Request, res: Response) => {
  const productId = req.params.productId
  res.send(`Actualizar el producto con ID: ${productId}`)
}

export const deleteProduct = (req: Request, res: Response) => {
  const productId = req.params.productId
  res.send(`Eliminar el producto con ID: ${productId}`)
}
