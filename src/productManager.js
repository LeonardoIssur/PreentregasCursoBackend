import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class ProductManager {
    constructor() {
        this.path = 'products.json';
        this.products = [];
    }

    addProduct = async ({ title, description, price, thumbnail, code, stock, status = true, category }) => {
        const id = uuidv4();

        const newProduct = { id, title, description, price, thumbnail, code, stock, status, category };

        this.products = await this.getProducts();
        this.products.push(newProduct);

        await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));

        return newProduct;
    }

    getProducts = async () => {
        try {
            const response = await fs.readFile(this.path, 'utf8');
            return JSON.parse(response);
        } catch (error) {
            return [];
        }
    }

    getProductById = async (id) => {
        const products = await this.getProducts();
        return products.find(product => product.id === id) || null;
    }

    updateProduct = async (id, data) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products[index] = { ...products[index], ...data };
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
            return products[index];
        } else {
            return null;
        }
    }

    deleteProduct = async (id) => {
        const products = await this.getProducts();
        const index = products.findIndex(product => product.id === id);

        if (index !== -1) {
            products.splice(index, 1);
            await fs.writeFile(this.path, JSON.stringify(products, null, 2));
        } else {
            console.log('Producto no encontrado');
        }
    }
}
