import { InternalServerError, NotFoundError } from '@/errors'
import { Zone } from '@/models/Zone'
import { type AuthenticatedRequest } from '@/types'
import { type Response } from 'express'

export const listAllZones = async (req: AuthenticatedRequest, res: Response) => {
  const zones = await Zone.query().where({ user_id: req.auth?.user.id })
  return res.json(zones)
}

export const getZoneDetails = async (req: AuthenticatedRequest, res: Response) => {
  const zoneId = req.params.zoneId

  const zone = await Zone.query()
    .findById(zoneId)
    .where({ user_id: req.auth?.user.id })

  if (!zone) {
    throw new NotFoundError('Zone not found')
  }

  return res.json(zone)
}

export const getZoneProducts = async (req: AuthenticatedRequest, res: Response) => {
  const zoneId = req.params.zoneId

  const zone = await Zone.query()
    .findById(zoneId)
    .where({ user_id: req.auth?.user.id })
    .withGraphFetched('products')

  if (!zone) {
    throw new NotFoundError('Zone not found')
  }

  return res.json(zone)
}

export const createNewZone = async (req: AuthenticatedRequest, res: Response) => {
  const zone = await Zone.query()
    .insert({
      ...req.body,
      user_id: req.auth?.user.id
    })
  return res.json(zone)
}

export const updateZone = async (req: AuthenticatedRequest, res: Response) => {
  const zoneId = req.params.zoneId

  const zone = await Zone.query()
    .findById(zoneId)
    .where({ user_id: req.auth?.user.id })
    .patch(req.body)
    .returning('*')

  if (!zone) {
    throw new NotFoundError('Zone not found')
  }

  return res.json(zone)
}

export const deleteZone = async (req: AuthenticatedRequest, res: Response) => {
  const zoneId = req.params.zoneId

  const zone = await Zone.query()
    .findById(zoneId)
    .where({ user_id: req.auth?.user.id })

  if (!zone) {
    throw new NotFoundError('Zone not found')
  }

  const deletedCount = await Zone.query()
    .deleteById(zoneId)

  if (deletedCount === 0) {
    throw new InternalServerError('Zone was not deleted. Please, contact the admin')
  }

  return res.status(204).send()
}
