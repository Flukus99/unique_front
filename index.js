let PESO=document.getElementById("peso");
let TALLA=document.getElementById("talla");
let BTN=document.getElementById("buton");
let SELECT=document.getElementById("select");
let CONTENEDOR=document.getElementById("contenedor");
let spiner=document.querySelector(".spiner");

BTN.addEventListener("click",()=>{
    llamar()
})
let numero_llamados=1
function llamar(){
    
    CONTENEDOR.textContent="";
    spiner.setAttribute("class","active");
    BTN.setAttribute("class","no-active")
    const options = {method: 'POST',headers: {"Content-type": "application/json;charset=UTF-8"},
    body: `{"peso":${PESO.value},"talla":${TALLA.value},"tipo":"${SELECT.value}","llamados":${numero_llamados}}`};
    
    fetch('https://mianthro.herokuapp.com/files', options)
      .then(response => response.json())
      .then(response => {
        setTimeout(()=>{
            pedir_datos()
        },2000)
        
      })
      .catch(err => console.error(err));
}




function pedir_datos(){
    const options = {method: 'GET'};

fetch(`https://mianthro.herokuapp.com/files`, options)
  .then(response => response.json())
  .then(response => {
    numero_llamados++
    valorar(response)
  })
  .catch(e=>{});
}














function valorar(response){

    let respuesta=response.resultados[0].valor
    var valoracion=""
    
    switch (respuesta) {
        case "0":
            valoracion="Peso adecuado para la talla"
            break;
        case "1":
            valoracion="Riesgo de desnutrición"
            break;    
        case "2":
            valoracion="Desnutricion Aguda Moderada"
            break;
        case "3":
            valoracion="Desnutricion aguda severa"
        break;
        case "4":
            valoracion="Obesidad"
            break;
        case "5":
            valoracion="Riesgo de Sobrepeso"
            break;
        case "6":
            valoracion="Sobrepeso"
            break;            
        default:
            break;
    }
    pintar(valoracion)
}

function pintar(valoracion){
    spiner.setAttribute("class","spiner");
    BTN.setAttribute("class","btn btn-success")
    CONTENEDOR.textContent=valoracion
    valoracion=""
}