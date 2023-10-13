import { Router } from 'express'
import {
  createNewZone,
  deleteZone,
  getZoneDetails,
  getZoneProducts,
  listAllZones,
  updateZone
} from '@/controllers/zones'

const router = Router()

// Zones endpoints
router.get('/', listAllZones)
router.get('/:zoneId', getZoneDetails)
router.post('/', createNewZone)
router.put('/:zoneId', updateZone)
router.delete('/:zoneId', deleteZone)

// zones -> products endpoint

router.get('/:zoneId/products', getZoneProducts)

export default router
