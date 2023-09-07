async function getMoneda(){
    const res = await fetch("https://mindicador.cl/api");
    const monedas = await res.json();
    console.log(monedas);
}