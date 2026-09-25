//*****************************************//
//          Pre-Entrega NodeJS             //
//            Septiembre 2026              //
//             Martín Zabala               //
//*****************************************//

// Capturo los argumentos de la terminal descartando los 2 primeros (node e index.js)
const args = process.argv.slice(2);

// Extraigo el método de la petición (GET, POST, DELETE) y el recurso solicitado
const method = args[0]; 
const endpoint = args[1]; 

const BASE_URL = "https://fakestoreapi.com";

console.log("Inicio del programa...\n");

// Función principal asíncrona para gestionar las solicitudes a la API
async function main() {
    try {
        switch (method) {
            case "GET": {
                // Valida que el recurso empiece con 'products' (ej: 'products' o 'products/15')
                if (!endpoint || !endpoint.startsWith("products")) {
                    console.log("Recurso no válido. Debe ser 'products' o 'products/<productId>'");
                    console.log("Ejemplos: npm run start GET products | npm run start GET products/15");
                    return;
                }

                const response = await fetch(`${BASE_URL}/${endpoint}`);
                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
                
                const data = await response.json();
                console.log("Resultado de la petición GET:");
                console.log(data);
                break;
            }

            case "POST": {
                // Lectura de los parámetros adicionales para crear un producto
                const title = args[2];
                const price = args[3];
                const category = args[4];

                // Validación de que existan todos los parámetros y que el precio sea numérico
                if (endpoint !== "products" || !title || !price || isNaN(price) || !category) {
                    console.log("Comando incompleto o formato de precio inválido.");
                    console.log("Uso correcto: npm run start POST products <title> <price> <category>");
                    return;
                }

                const response = await fetch(`${BASE_URL}/products`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: title,
                        price: parseFloat(price), // Conversión de texto a número decimal
                        category: category
                    })
                });

                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

                const data = await response.json();
                console.log("Producto Creado exitosamente:");
                console.log(data);
                break;
            }

            case "DELETE": {
                // Valida que se especifique un producto concreto (ej: 'products/7')
                if (!endpoint || !endpoint.startsWith("products/")) {
                    console.log("Falta especificar el ID del producto a eliminar.");
                    console.log("Uso correcto: npm run start DELETE products/<productId>");
                    return;
                }

                const response = await fetch(`${BASE_URL}/${endpoint}`, {
                    method: "DELETE"
                });

                if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

                const data = await response.json();
                console.log("Producto Eliminado exitosamente:");
                console.log(data);
                break;
            }

            default:
                console.log("Comando incorrecto o incompleto.");
                console.log("Ejemplos válidos de uso:");
                console.log("  npm run start GET products");
                console.log("  npm run start GET products/15");
                console.log("  npm run start POST products T-Shirt 300 remeras");
                console.log("  npm run start DELETE products/7\n");
                break;
        }
    } catch (error) {
        console.error("Error al procesar la petición:", error.message);
    }
}

main();