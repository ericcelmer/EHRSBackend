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

const getDiagnosisList = (request, response) => {
  pool.query('select icd19_code from diagnosis', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDoctorID = (request, response) => {
  pool.query("select employeeid from employee where position = 'doctor' limit 1", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getNurseID = (request, response) => {
  pool.query("select employeeid from employee where position = 'nurse' limit 1", (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addOrder = (request, response) => {
  const {order_id, employeeid, patientid, order_type, order_name} = request.body
  console.log(request.body)
  pool.query('INSERT INTO orders (order_id, employeeid, patientid, order_type, order_name) VALUES ($1, $2, $3, $4, $5)', [order_id, employeeid, patientid, order_type, order_name], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send()
  })
}

  module.exports = {
      getDiagnosisPrice,
      getDiagnosisList,
      getDoctorID,
      getNurseID,
      addOrder
  }