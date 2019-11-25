var express=require("express")
var app = express();
var morgan = require('morgan');

var bodyParser=require("body-parser");
var routes = require("./routes")
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

app.all('*', function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
    if ('OPTIONS' == req.method) return res.send(200);
    next();
});
app.use(morgan('dev'));


//Routes
app.use('/api/users', routes);


var server = app.listen(9000,function()
{
    var host = server.address().address
    var port = server.address().port
    console.log('app running at host', port)
});