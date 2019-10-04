const express = require('express');
const server = express();

//middleware
const morgan = require('morgan');
server.use(morgan('tiny'));

const helmet = require('helmet');
server.use(helmet());

const cors = require('cors');
server.use(cors());

server.get('/', (req, res) => {
    res.send('Hello World!');
});

let PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    `Application running on ${PORT}`;
});
