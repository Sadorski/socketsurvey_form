const express = require('express');
const app = express();
const path = require('path');
const server = app.listen(1337);
const io = require('socket.io')(server);
app.use(express.static(path.join(`${__dirname}/static`)));
app.set('views', path.join(`${__dirname}/views`));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index')
})

io.on('connection', function (socket) { 
    console.log('A user connected');
    socket.on('user_information', function(data){
        console.log('hello')
        socket.emit('user_information', {name: data.name,
                                        location: data.loc,
                                        language: data.lang,
                                        comment: data.comment})

    })
})


