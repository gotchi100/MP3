const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const routes = require('./routes');
const hbs = require('express-handlebars');
const app = express()
const mongoose = require('mongoose');
const multer = require('multer');
var port = process.env.PORT || 8080;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

var blocks = {};

app.engine('hbs', hbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: {
        extend: function (name, context) {
            var block = blocks[name];
            if (!block) {
                block = blocks[name] = [];
            }

            block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
        },
        block: function (name, options) {
            var val = (blocks[name] || []).join('\n');

            // clear the block
            blocks[name] = [];
            return val;
        }
    }
}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// add handelbars
app.set("view engine", "hbs")

// set static folder
app.use(express.static(path.join(__dirname, 'static')))

app.use("/", routes)

connect()

function listen() {
    app.listen(port, () => {
        console.log(`Example app listening at http://$localhost:${port}`)
    })
  }

// connect to mongodb and if successfully connected we also open our port for our node app 
function connect() {
  databaseUrl = "mongodb+srv://student:123@cluster0.bbcgr.mongodb.net/studentdb?retryWrites=true&w=majority"
  mongoose.connection
    .on('error', console.log) //if error happened when connecting to db we log the error
    .on('disconnected', connect) //if we got disconnected to the datbase we will call again the connect function 
    .once('open', listen); //if sucessfully connected to db we call the listen function 
  return mongoose.connect(databaseUrl, {
    keepAlive: 1,
    useNewUrlParser: true, //flag that allows parsing of the databaseurl properly
    useUnifiedTopology: true //prevents deprecation warnings from popping up https://mongoosejs.com/docs/deprecations.html 
  });
}