const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const registerRoutes = require('./routes/register.js'); 

const loginRoutes = require('./routes/login.js'); 
const userRoutes = require('./routes/user.js'); 

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(bodyParser.json({limit : "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit : "30mb", extended : true}));
app.use(cors());

app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/user', userRoutes);


const connectionUrl = 'mongodb+srv://padityak79:pc10thebest@cluster0.8ypgq.mongodb.net/ParkINSpace?retryWrites=true&w=majority';

const PORT = process.env.PORT || 5000;

mongoose.connect(connectionUrl, { useNewUrlParser : true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify', false);