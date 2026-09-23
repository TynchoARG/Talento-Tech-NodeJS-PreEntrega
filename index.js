//console.clear() //Limnpia la terminal
console.log("Inicio del CRUD...")

//conexion con la API FakeStore
/*
async function getProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products", { method: "GET" });
        if (response.ok) {
            const data = await response.json();
            console.log("Conexion exitosa")
            return data
        }
    } catch (error) {
        console.log(error)
    }
}
*/

const args =  process.argv.slice(2);

switch (args[0]) {
    case "GET":
        async function getProducts() {
            try{
                const response = await fetch("https://fakestoreapi.com/products", {method:"GET"});
                if (response.ok){
                    const data = await response.json();
                    console.log("Conexion Exitosa");
                    return data
                }
            } catch (error){
                console.log(error)
            }
        }
        break;
    case "GET products/":
        break;
    default:
        console.log("Coamndo incorrecto o incompleto");

}