const fs = require('fs')

class ProductManager {

    static #id = 0
    #products
    #path

    constructor(path) {
        this.#products = []
        this.#path = path
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        let mensaje

        const existeCodigo = this.#products.some(p => p.code === code)

        if (existeCodigo) {
            mensaje = `El código del producto ${code} ya existe`
        } else {
            const newProduct = {
                id: ++ProductManager.#id,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }

            if (!Object.values(newProduct).includes(undefined)) {
                this.#products.push(newProduct)
                try {
                    fs.writeFileSync(this.#path, JSON.stringify(this.#products))
                } catch (error) {
                    console.log(error)
                }
                mensaje = 'Se agrego el producto exitosamente!'
            } else {
                mesanej = "Completar todos los campos"
            }
        }
        return mensaje;
    }

    getProduct() {
        //return this.#products
        try {
            if(fs.existsSync(this.#path)){
                const data = fs.readFileSync(this.#path, 'utf-8')
                return JSON.parse(data)
            }else {
                return 'Archivo inexistente'
            }      
        } catch (error) {
            console.log(error)
        }
    }

    getProductById(id) {
        const productId = this.#products.find(p => p.id === id)

        return productId ? productId : `No existe ningun producto con el Id ${id}`
    }

    updateProduct(id, propiedades) {
        try {
            let mensaje
        const index = this.#products.findIndex(p => p.id === id)

        if (index != -1) {
            const { id, ...rest } = propiedades
            this.#products[index] = { ...this.#products[index], ...rest }
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            mensaje = 'Se actualizo correctamente el producto'
        } else
            mensaje = `El producto con ID ${id} no existe`

            return mensaje
        } catch (error) {
            console.log(error)
        }
    }

    deleteproduct(id) {
        try {
            let mensaje
        const index = this.#products.findIndex(p => p.id === id)

        if (index >= 0) {
            this.#products.splice(index, 1)
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            mensaje = 'Producto fue eliminado'
        } else
            mensaje = `No existe ningun producto con el ID ${id}`

        return mensaje
        } catch (error) {
           console.log(error) 
        }
    }
}
const productos = new ProductManager('productos.json')

const p1 = productos.addProduct("Nike", "Jordan1", 200, "thumbnail1", "xx1", 10)
const p2 = productos.addProduct("Nike", "Jordan2", 240, "thumbnail2", "xx2", 50)
const p3 = productos.addProduct("Nike", "Jordan3", 220, "thumbnail3", "xx3", 20)
const p4 = productos.addProduct("Nike", "Jordan4", 350, "thumbnail4", "xx4", 15)
const p5 = productos.addProduct("Nike", "Dunk Panda", 200, "thumbnail5", "xx5", 12)
const p6 = productos.addProduct("Nike", "AF1", 150, "thumbnail6", "xx6", 9)
console.log({ p1, p2, p3, p4, p5, p6 })

//console.log(productos.deleteProduct(2))
//console.log(productos.deleteProduct(15))

/*const updateP1 = {
    id: 25,
    price: 350,
    stock: 30,
    thumbnail: './img/AFSupreme.jpg',
    title: 'AirForce Supreme'
}*/

//console.log(productos.updateProduct(3, updateP1))
console.log(productos.getProduct())