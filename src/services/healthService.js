const db = require('../data/db')

function checkHealth() {
  const dbOk = Array.isArray(db.landings) && Array.isArray(db.leads)

  const status = {
    status: dbOk ? 'ok' : 'error',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    db: {
      connected: dbOk,
      landingsCount: dbOk ? db.landings.length : 0,
      leadsCount: dbOk ? db.leads.length : 0
    }
  }

  return status
}

module.exports = { checkHealth }