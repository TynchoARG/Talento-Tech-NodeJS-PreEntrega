//*****************************************//
//          Pre-Entrega NodeJS             //
//            Septiembre 2026              //
//             Martín Zabala               //
//*****************************************//

// Obtengo los datos de la terminal y descarto los dos primeros
const args = process.argv.slice(2);

// Creo las variables para armar los argumentos que escribo en la terminal
const method = args[0]; // GET, POST, DELETE
const endpoint = args[1]; // products o products/15

const BASE_URL = "https://fakestoreapi.com";

console.log('Inicio del programa')
console.log()

//funcion principal donde capturo los argumentos
async function main() {
    try {
        switch (method) {
            case "GET": {
                if (!endpoint) {
                    console.log("Falta especificar el recurso (ej: products o products/15)");
                    return;
                }
                const response = await fetch(`${BASE_URL}/${endpoint}`);
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                
                const data = await response.json();
                console.log("Resultado petición GET:");
                console.log(data);
                break;
            }

            case "POST": {
                // npm run start POST products <title> <price> <category>
                const title = args[2];
                const price = args[3];
                const category = args[4];

                if (endpoint !== "products" || !title || !price || !category) {
                    console.log("Comando incompleto.")
                    console.log("Uso correcto: npm run start POST products <title> <price> <category>");
                    return;
                }

                const response = await fetch(`${BASE_URL}/products`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: title,
                        price: parseFloat(price),
                        category: category
                    })
                });

                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

                const data = await response.json();
                console.log("Producto Creado:");
                console.log(data);
                break;
            }

            case "DELETE": {
                // npm run start DELETE products/<productId>
                if (!endpoint) {
                    console.log("Falta especificar el producto a eliminar (ej: products/7)");
                    return;
                }

                const response = await fetch(`${BASE_URL}/${endpoint}`, {
                    method: "DELETE"
                });

                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

                const data = await response.json();
                console.log("Producto Eliminado:");
                console.log(data);
                break;
            }

            default:
                console.log("Comando incorrecto o incompleto.");
                console.log("Ejemplos válidos:");
                console.log("  npm run start GET products");
                console.log("  npm run start GET products/15");
                console.log("  npm run start POST products T-Shirt 300 remeras");
                console.log("  npm run start DELETE products/7");
                console.log();
                break;
        }
    } catch (error) {
        console.error("Error al realizar la petición:", error.message);
    }
}

main();