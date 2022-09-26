var express = require('express'); // For handling routes when post get or else any method of requests coming in.
var cors = require('cors');       // For handling 3rd party communications like getting data.
require('dotenv').config()        // For saving hidden information, when uploading to github. .env is kinda bash like program.
const multer = require("multer"); // For handling Packages middleware uploading files

var app = express();              // The app is the handler of the routes.
var log = console.log.bind(log);  // shortcut for Logging.

app.use(cors());                      // Middleware function for crossorigin resource sharing.
app.use((req, res, next) => {         // For every request write to console whoip whourl.
  log(`req.ip: ${req.ip} ${req.url}`)
  next();
})

app.use('/public', express.static(process.cwd() + '/public'));  // The files will be served static which could be accessible anytime.

app.get('/', function (req, res) {                      // The main page of the application when url is entered like host:3000// or heroku.com/
  res.sendFile(process.cwd() + '/views/index.html');    // Response send the index.html        
});

const fileStorageEngine = multer.diskStorage({          // Where to get where to write options set for multer
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine })    // upload configuration is selection 

app.post("/api/fileanalyse", upload.single('upfile'), (req, res, next) => {  // Middleware added in the middle for handling files,
  console.log(req.file)
  res.json({
    "name": req.file.originalname, "type": req.file.mimetype, "size": req.file.size
  })
})

const port = process.env.PORT || 3000;                  // If environment is coming from .env package or if not 3000 is served for server
app.listen(port, function () {                          // 
  console.log('Your app is listening on port ' + port)
});
