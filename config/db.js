const mongoose = require('mongoose');

//Map global promise
mongoose.Promise = global.Promise;
const connection = 'mongodb+srv://Jing:JsSurvey3Q@cluster0-iudi1.mongodb.net/test?retryWrites=true&w=majority'
//Mongoose connnect
mongoose.connect(connection, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));