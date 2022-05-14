const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'electronichealthrecordsystem.cwcuew6dfznh.us-east-1.rds.amazonaws.com',
  database: 'electronic_health_record_system',
  password: 'cosc612DB',
  port: 5432,
})

const getDiagnosisPrice = (request, response) => {
    pool.query('SELECT * FROM diagnosis_price', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
      getDiagnosisPrice
  }