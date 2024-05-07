// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
let responseObject = {};

app.get('/api/timestamp/:input', (request, result) => {
  let input = request.params.input;

  if(input.includes('-')) {
    responseObject['unix'] = new Date(input).getTime();
    responseObject['utc'] = new Date(input).toUTCString();
  } else {
    input = parseInt(input);
    
    responseObject['unix'] = new Date(input).getTime();
    responseObject['utc'] = new Date(input).toUTCString();
  }

  if(!responseObject['unix'] || !responseObject['utc']) {
    result.json({error: 'Invalid Date'});
  }

  result.json(responseObject);
})

app.get('/api/timestamp', (request, result) => {
  responseObject['unix'] = new Date(input).getTime();
  responseObject['utc'] = new Date(input).toUTCString();

  result.json(responseObject);
})

// const getTimestamp = date => ({ unix: date.getTime(), utc: date.toUTCString() });

// app.get("/api/timestamp/:date?", function (req, res) {
//   const dateString = req.params.date;
//   console.log(dateString);
//   let timestamp;

//   if (dateString === undefined || dateString.trim() === "") {
//       let currentTime = new Date();
//       timestamp = getTimestamp(currentTime);
//     } else {
//       const date = !isNaN(dateString) ? new Date(parseInt(dateString)) : new Date(dateString);

//       if (!isNaN(date.getTime())) {
//         timestamp = getTimestamp(date);
//       } else {
//         timestamp = { error : "Invalid Date" };
//       }
//     }
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(JSON.stringify(timestamp));
// })



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});