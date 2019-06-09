const express = require('express');
const app = express();



app.use(express.static('./public'));

app.get('/', function(req, res){
    
    res.sendFile(__dirname + '/main.html');
    
});

// app.get('/style.css', function(req, res){
    
//     res.sendFile(__dirname + '/style.css');
    
// })

app.get('/script.js', function(req, res){
    
    res.sendFile(__dirname + '/script.js')
    
})

app.listen(3030, function(){
    console.log('Server start on port 3030')
})
// const express = require('express')
// const app = express()
// const server = require('http').createServer(app)
// //const io = require('socket.io').listen(server)

// server.listen(3000) // Слушаем порт 3000

// app.get('/', function(request, response) {
//     // По запросу отправляем файл index.html
//     response.sendFile(__dirname + '/main.html')
// })

