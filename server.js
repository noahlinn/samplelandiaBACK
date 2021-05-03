const express = require('express')
const app = express()

app.use(require('morgan')('tiny'))
const routesReport = require('rowdy-logger').begin(app)

app.use(express.json({ limit: '200mb' }))
app.use(require('cors')())


const userRoutes = require('./routes/userRoute')
const sampleRoutes = require('./routes/sampleRoute')
const userCreatedSampleRoute = require('./routes/userCreatedSampleRoute')

app.use('/users', userRoutes)
app.use('/samples', sampleRoutes)
app.use('/userCreatedSamples', userCreatedSampleRoute)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
  routesReport.print()
})