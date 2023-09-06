import express  from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import router from './routes/products.js'; 
import cartRouter from './routes/carts.js';
import viewsRouter from './routes/viewsRouters.js' 

const app = express();
const sv = app.listen(8080, () => console.log("Funcando"));
const socketServer = new Server(sv);

app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'));

app.use((req, res, next) => {
    req.context = { socketServer };
    next();
})  

app.use(express.urlencoded({ extended:true }));
app.use(express.json());

app.use("/", viewsRouter);
app.use("/api/products", router);
app.use("/api/carts", cartRouter);

sv.on('error', error => console.log(error));