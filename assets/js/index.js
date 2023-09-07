const buttonBuscar = document.querySelector("#buscar");//DOM del buscar
const resultado = document.querySelector("#resultado");//DOM del resultado
const valorMoneda = document.querySelector("#moneda");//DOM del select
const inputPeso = document.querySelector("#monto");//DOM del input en Pesos CLP
let valorCalculado


buttonBuscar.addEventListener("click", () => {
    renderMoneda();
})

async function getMoneda(){ //funcion para obtener los datos de la API
    try{
    const res = await fetch("https://mindicador.cl/api");
    const monedas = await res.json();
    return monedas;
}catch (error) {
    console.error(`Error en getMoneda: ${error}`)
    fallo = document.querySelector("#catchError");
    fallo.textContent = `Error: ${error.message}`;
    fallo.style.color = ("red");
    throw error;
};
}
async function renderMoneda(){ //funcion para actualizar el DOM
    try{
    const monedas = await getMoneda();
    const dolar = monedas.dolar.valor;
    const uf = monedas.uf.valor;
    const euro = monedas.euro.valor;
    const bitcoin = monedas.bitcoin.valor;
    
    switch (valorMoneda.value) {
        case "dolar":
            resultado.innerHTML = `$${(inputPeso.value / dolar).toFixed(2)} dolares`;
        break;
        case "uf":
            resultado.innerHTML = `${(inputPeso.value / uf).toFixed(2)} UF`;
        break;
        case "euro":
            resultado.innerHTML = `$${(inputPeso.value / euro).toFixed(2)} euros`;
        break;
        case "bitcoin":
            resultado.innerHTML = `${((inputPeso.value/ dolar)/bitcoin).toFixed(6)} Bitcoin`;
        break;
        default:
            console.log("no ingreso ningun valor");
        break;
    }
}catch (error) {
    console.error(`Error en renderMoneda: ${error}`)
    fallo = document.querySelector("#catchError");
    fallo.textContent = `Error: ${error.message}`;
    fallo.style.color = ("red");
    throw error;
    };
}
//grafica
renderMoneda();