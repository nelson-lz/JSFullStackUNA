const express = require('express');
const morgan = require('morgan');
const path = require('path');
const SocketIo = require('socket.io');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();
const app = express();

//settings
app.set('port', process.env.PORT || 4000);
require('./database');

//static files
app.use(express.static(path.join(__dirname,'public')));

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/compras', require('./routes/compras.routes'));

//settings the server
const server = app.listen(app.get('port'), ()=> {
    console.log('Server on port',app.get('port'));
});

const io = SocketIo(server);

io.on('connection', (socket) => {
    socket.on('fetchProductos', async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/productos');
            await socket.emit('Productos', res.data);
        } catch (error) {
            console.log(error);
        }
    });
});