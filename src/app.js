import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";

import { __dirname } from "./utils.js";
import path from "path";

import {engine} from "express-handlebars";
import { connectDB } from "./config/dbConnection.js";

import passport from "passport";
import { initializePassport } from "./config/passport.config.js";

import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { sesionsRouter } from "./routes/sessions.routes.js";

import { config } from "./config/config.js";




const port = 8080;
const app = express();
app.listen(port,()=> console.log("servidor ok"));

//middlewares
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//conexión base de datos
connectDB();

//configuración de handlebars motor de plantillas
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// configurar la session
app.use(session({
    store:MongoStore.create(
        {
            ttl:1000,
            mongoUrl:config.mongo.url
        }

    ),
    secret:config.server.secretSession,
    resave:true,
    saveUninitialized:true

})


);

// configurar passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());



// routes
app.use(viewsRouter);
app.use("/api/sessions",sesionsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

