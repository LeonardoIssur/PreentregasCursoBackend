import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import { ProductManager } from './src/productManager';
import { productsRouter } from './src/routes/products.router';

const PORT = 8080; 

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

export const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Rutas de productos
app.use('/api/products', productsRouter);

// Rutas de vistas
app.get('/home', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('home', { products });
});

app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realtimeproducts', { products });
});

// Configuración de Socket.io
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('newProduct', async (product) => {
        await productManager.addProduct(product);
        const products = await productManager.getProducts();
        io.emit('updateProducts', products);
    });

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProduct(id);
        const products = await productManager.getProducts();
        io.emit('updateProducts', products);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
