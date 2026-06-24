const express = require('express')
const router = express.Router()
const healthService = require('../services/healthService')

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Verificar el estado del servidor y la base de datos
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: El servidor y la base de datos están operativos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: ok }
 *                 uptime: { type: number, example: 123.45 }
 *                 timestamp: { type: string, format: date-time }
 *                 db:
 *                   type: object
 *                   properties:
 *                     connected: { type: boolean, example: true }
 *                     landingsCount: { type: integer, example: 4 }
 *                     leadsCount: { type: integer, example: 3 }
 *       503:
 *         description: La base de datos no está disponible
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: string, example: error }
 */
router.get('/', (req, res, next) => {
  try {
    const health = healthService.checkHealth()
    const httpStatus = health.status === 'ok' ? 200 : 503
    res.status(httpStatus).json(health)
  } catch (err) {
    next(err)
  }
})

module.exports = router