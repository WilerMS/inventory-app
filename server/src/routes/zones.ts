import { Router } from 'express'
import {
  createNewZone,
  deleteZone,
  getZoneDetails,
  getZoneProducts,
  listAllZones,
  updateZone
} from '@/controllers/zones'
import { errorHandler } from '@/utils'

const router = Router()

// Zones endpoints
router.get('/', errorHandler(listAllZones))
router.get('/:zoneId', errorHandler(getZoneDetails))
router.post('/', errorHandler(createNewZone))
router.put('/:zoneId', errorHandler(updateZone))
router.delete('/:zoneId', errorHandler(deleteZone))

// zones -> products endpoint

router.get('/:zoneId/products', errorHandler(getZoneProducts))

export default router
