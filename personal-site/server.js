const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db          = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ 
    extended : true
}));

app.use(bodyParser.json());

MongoClient.connect(db.url, { useNewUrlParser: true }, (err, database) =>{
    if (err){
        return console.log(err);
    }

    const database2 = database.db("site-api");
    require('./routes')(app, database2);
    app.listen(port, () => {
        console.log('Started in port '+ port);
    });
    
})
