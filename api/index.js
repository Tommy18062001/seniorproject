const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();


const corsOptions = {
    origin: true,
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };

// parse Json
app.use(express.json());
// parse cookies
app.use(cookieParser());
// allow frontend app to access images
app.use("/uploads", express.static(__dirname + "/uploads"));
// fix cors permission
app.use(cors(corsOptions));

app.listen(4000);