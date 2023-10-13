import { type Request, type Response } from 'express'

export const listAllZones = (req: Request, res: Response) => {
  res.send('Listar todas las zonas')
}

export const getZoneDetails = (req: Request, res: Response) => {
  const zoneId = req.params.zoneId
  res.send(`Detalles de la zona con ID: ${zoneId}`)
}

export const getZoneProducts = (req: Request, res: Response) => {
  const zoneId = req.params.zoneId
  res.send(`Detalles de la zona con ID: ${zoneId}`)
}

export const createNewZone = (req: Request, res: Response) => {
  res.send('Crear una nueva zona')
}

export const updateZone = (req: Request, res: Response) => {
  const zoneId = req.params.zoneId
  res.send(`Actualizar la zona con ID: ${zoneId}`)
}

export const deleteZone = (req: Request, res: Response) => {
  const zoneId = req.params.zoneId
  res.send(`Eliminar la zona con ID: ${zoneId}`)
}
