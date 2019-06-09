const express = require('express');
const app = express();



app.use(express.static('./public'));

app.get('/', function(req, res){
    
    res.sendFile(__dirname + '/main.html');
    
});

app.get('/script.js', function(req, res){
    
    res.sendFile(__dirname + '/script.js')
    
})

app.listen(3030, function(){
    console.log('Server start on port 3030')
})


