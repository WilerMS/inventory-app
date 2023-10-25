import { type RequestHandler } from 'express'
import Vibrant from 'node-vibrant'

export const errorHandler = (handler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export async function getPredominantColor (imagePath: string): Promise<string | undefined> {
  try {
    const vibrant = new Vibrant(imagePath)
    const palette = await vibrant.getPalette()
    const color = palette.DarkMuted?.hex
    return color
  } catch {
    return undefined
  }
}
