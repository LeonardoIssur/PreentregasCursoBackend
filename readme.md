# Desarrollo Backend preentrega 1

Proyecto de API para ecommerce.


## Consignas cumplidas:
 Inicializar servidor en puerto 8080
 El servidor responde correctamente a las siguiente solicitudes:

- GET localhost:8080/api/products
- GET localhost:8080/api/products?limit=# (reemplazar el numeral por el numero deseado)
- GET localhost:8080/api/products/:pid
- POST localhost:8080/api/products/ (se verifica que el producto cumpla con los campos obligatorios y se genera Id unico y status or defecto automaticamente)
- PUT localhost:8080/api/products/:pid (al actualizar se verifica que el ID no se cambie)
- DELETE localhost:8080/api/products/:pid
- GET localhost:8080/api/carts/:cid
- POST localhost:8080/api/carts/
- POST localhost:8080/api/carts/:cid/product/:pid (se verifica si el producto yaexiste e incrementa la propiedad quantity en caso de ser necesario)


## Aclaraciones:
- Tanto el archivo **products.json** como **carts.json** ya están creados en el repositorio, producto de las diferentes pruebas que hice al armar el codigo y verificar que funcione correctamente. De todas formas en caso de eliminarlos, vuelven a crearse al momento de enviar una solicitud post. Los dejo como ejemplo para probar el limite y la busquda por id sin necesidad de cargar varios productos/carritos a mano.

