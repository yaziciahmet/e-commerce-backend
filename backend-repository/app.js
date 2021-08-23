const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const logRouter = require('./Routers/logRouter');
const registerRouter = require('./Routers/registerRouter');
const userprofileRouter = require('./Routers/userprofileRouter');
const productRouter = require('./Routers/productRouter');
const basketRouter = require('./Routers/basketRouter');
const commentRouter = require('./Routers/commentRouter');
const invoiceRouter = require('./Routers/invoiceRouter');

// MIDDLEWARES
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());



// CONNECT TO DATABASE
let dbURI = 'mongodb+srv://ahmet:2392139ahmet@cluster.unpir.mongodb.net/cs_project?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {

    console.log('connected to DB');
    app.listen(3000);

});


// ROUTES
app.use(logRouter);
app.use(registerRouter);
app.use(userprofileRouter);
app.use(productRouter);
app.use(basketRouter);
app.use(commentRouter);
app.use(invoiceRouter);
mongoose.set('useCreateIndex', true);