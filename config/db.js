const mongoose = require('mongoose');

//Map global promise
mongoose.Promise = global.Promise;
//Mongoose connnect
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb+srv://Jing:JsSurvey3Q@cluster0-iudi1.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));