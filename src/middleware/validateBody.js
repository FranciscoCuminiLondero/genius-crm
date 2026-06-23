function validateBody(requiredFields) {
    return (req, res, next) => {
      const missing = requiredFields.filter(field => !req.body[field])
   
      if (missing.length > 0) {
        return res.status(400).json({
          error: `Faltan campos requeridos: ${missing.join(', ')}`
        })
      }
   
      next()
    }
  }
   
  module.exports = validateBody