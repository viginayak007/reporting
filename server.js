const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const { Parser } = require('json2csv'); //convertor

const server = express();
const port = 8080;


server.use(bodyParser.json({limit: '10mb', extended: true}));
server.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
server.use(bodyParser.raw({limit: '10mb', extended: false}));

server.use(cors())
server.options('*', cors());

server.listen(port, () => console.log(`API is running on port ${port}`));

server.use(express.static('./public'));
server.get('/', (req, res) => {
  res.render('index');
});

// rest api to handle data requests
server.post('/ping', (req, res) => {
   
    res.send('ping'); 
   
    
});

// rest api to handle data requests
server.post('/jsontocsv', (req, res) => {

    const fields = JSON.parse(req.body.fields);
    const data = JSON.parse(req.body.data);
    
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);
    res.send(csv); 
    // fs.appendFile('mynewfile1.csv', csv, function (err) {
    //     if (err) throw err;
    //     res.sendFile('mynewfile1.csv' , { root : __dirname});
    // });
    
});
