//console.clear() //Limnpia la terminal
console.log("Inicio del CRUD...")

//conexion con la API FakeStore

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