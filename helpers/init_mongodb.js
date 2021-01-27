const mongoose = require('mongoose')


mongoose.connect(process.env.CONNECTION_STRING, 
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true })
.then(()=>{
    console.log('Mongo Db Connected')
})
.catch(error => console.log(error.message))

mongoose.connection.on('connected', ()=>{
    console.log('Mongoose connected to Db')
})

mongoose.connection.on('error', (err)=>{
      console.log(err.message)
})

mongoose.connection.on('disconnected', ()=>{
    console.log('Mongoose connection is disconnected')
})

//Below is triggered when CTRL+C is clicked and closes the mongoose connection
process.on('SIGINT', async()=>{
    await mongoose.connection.close()
    process.exit(0)
})