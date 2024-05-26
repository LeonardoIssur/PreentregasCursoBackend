import { Router } from "express";
import { productManager } from "../../index.js";

const productsRouter = Router()

productsRouter.get('/', async(req, res) => {
    try {
        const { limit } = req.query
        const products = await productManager.getProducts()

        if( limit ){
            const limiteProducts = products.slice(0, limit)
            return res.json(limiteProducts)
        }

        return res.json(products)
    } catch(error) {
        console.log(error)
        res.send('error al intentar recibir los productos')
    }
})

productManager.get('/.pid', async (req, res) => {
    const {pid} = req.params;
    try {  
        const products = await productManager.getProductsById(pid)
        res.json(products)
    } catch {
        console.log(error);
        res.send( `error al intentar recibir el producto con id ${pid}`)
    }
})

productManager.post('/', async (req, res) =>{
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.addProduct({ title, description, price, thumbnail, code, stock, status, category})
        res.json(response)
    } catch (error) {
        res.send( `error al intentar agregar producto`)
    }
})

productManager.put('/:pid', async(req, res)=>{
    const {pid} = req.params;
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.updateProduct( pid, {title, description, price, thumbnail, code, stock, status, category})
        res.json(response)
    } catch (error) {
        res.send( `error al editar producto con id ${pid}`)
    }
})

productsRouter.delete('/:pid', async (req, res) =>{
    const {pid} = req.params;
    try {
        await productManager.deleteProduct(pid)
        res.send('producto eliminado')
    } catch (error) {
        res.send( `error al eliminar producto con id ${pid}`)
    }
})

export {productsRouter}