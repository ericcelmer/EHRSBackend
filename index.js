const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', '*');
  next();
});
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

app.post('/post-test', (req, res) => {
  console.log('Got body:', req.body);
  res.sendStatus(200);
});

const db = require('./queries')
app.get('/DiagnosisPrice', db.getDiagnosisPrice)
app.get('/DiagnosisList', db.getDiagnosisList)
app.get('/doctorID', db.getDoctorID)
app.get('/nurseID', db.getNurseID)
app.post('/order', db.addOrder)
app.put('/updateVisitSummary', db.updateVisitSummary)