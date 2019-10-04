const express = require('express');
const server = express();

//
//middleware
const morgan = require('morgan');
server.use(morgan('tiny'));

const helmet = require('helmet');
server.use(helmet());

const cors = require('cors');
server.use(cors());

server.use(express.json());
//
//Routes
const actionRoutes = require('./routes/actionRoutes');
const projectRoutes = require('./routes/projectRoutes');

server.get('/', (req, res) => {
    res.send('Hello World!');
});

server.use('/actions', actionRoutes);
server.use('/projects', projectRoutes);

//
//Error handler
server.use((err, req, res, next) => {
    res.json({
        message: 'There was an error',
        error: err,
    });
});

let PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    `Application running on ${PORT}`;
});
