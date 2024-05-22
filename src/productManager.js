import { promises as fs } from 'fs'
import { v4 as uuidv4 } from 'uuid'

export class ProductManager {
    constructor(){
        this.path = 'products.json';
        this.products = []
    }

    addProduct = async ({ title, description, price, thumbnail, code, stock, status, category }) => {
        const id = uuidv4()

        let newProduct = { id, title, description, price, thumbnail, code, stock, status, category}
        
        this.products = await this.getProducts()
        this.products.push(newProduct)

        awaitfs.writeFile(this.path, JSON.stringify(this.products))

        return newProduct;
    }
 
    getProducts = async () => {
        const response = await fs.readFile(this.path, 'utf8')
        const responseJSON = JSON.parse(response)

        return responseJSON; 
    }

    getProductsById = async (id) => {
        const response =  await this.getProducts()

        const product = response.find(product => product.id === id )

        if(product){
            return product
        } else {
            console.log('Producto no encontrado')
        }
    }

    updateProduct = async (id, {...data}) => {
        const products =  await this.getProducts()
        const index = response.findindex(product => product.id === id)

        if(index !== -1 ){
            products[index] = {id, ...data}
            await fs.writeFile(this.path, JSON.stringify(this.products))
            return this.products[index]
        } else {
            console.log('producto no encontrado');
        }
    }

    delateProduct = async (id) => {
        const products =  await this.getProducts()
        const index = response.findindex(product => product.id === id)

        if(index !== -1){
            products.splice(index, 1)
            await fs.writeFile(this.path, JSON.stringify(products))
        } else {
            console.log('producto no encontrado')
        }
    }

}

export default ProductManager;