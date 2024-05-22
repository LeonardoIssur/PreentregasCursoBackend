import express from 'express';
import ProductManager from './productManager'
import { productsRouter } from './routes/products.router';


const PORT = 8082; 

const app = express();

export const productManager = new ProductManager;

app.use(express.json())
app.use('/api/products', productsRouter)

app.listen(PORT, ( req, res )=> {
    console.log(`servidor escuchando en el puerto ${PORT}`);
})