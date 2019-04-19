var express=require("express")
var bodyParser=require("body-parser")
var morgan=require("morgan")
var config=require('./config')
var mongoose=require('mongoose')


mongoose.set('useCreateIndex',true)
mongoose.connect(config.database, { useNewUrlParser: true },function(err){
    if(err){
        console.log(err);
    }
    else console.log("Connected to DB.")
})
var app=express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(morgan('dev'))


var api=require('./app/routes/api')(app,express);

app.use('/api',api)


app.get('*',function(req, res){
    res.sendFile(__dirname+'/index.html')
})

app.listen(config.port, function(err){
    if(err){
        console.log(err);
    }
    else console.log("Listensing on port 3000");

})
