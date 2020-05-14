const mongoose = require('mongoose');

//Map global promise
mongoose.Promise = global.Promise;
//Mongoose connnect
mongoose.connect('mongodb+srv://Jing:JsSurvey3Q@cluster0-iudi1.mongodb.net/test?retryWrites=true&w=majority')
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));