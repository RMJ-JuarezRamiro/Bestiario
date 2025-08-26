//Funtion iniciar juego
const sectionSelecionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("recargar");
const botonPersonaje = document.getElementById("personajes");
const botonReiniciar = document.getElementById("reiniciar");

//variables para la funtion selecionar personaje
const radios = document.getElementsByName("mascota");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const imagenes = 
{
    Drakvar: "./imagenes/tarjeta1.png",
    Sylplora: "./imagenes/tarjeta2.png",
    Varganox: "./imagenes/tarjeta3.png",
    Elyndra: "./imagenes/tarjeta4.png",
    Morvath: "./imagenes/tarjeta5.png",
    Thalmyr: "./imagenes/tarjeta6.png"
};
const texto = document.createElement("p");
const imagen = document.createElement("img");
let sectionSelecionarPj = document.getElementById("seleccion-pj");
let bestiaElejidaPorJugador = "";

//variables para la funtion seleccionar personaje enemigo
const personajesDisponibles = ["Drakvar", "Sylplora", "Varganox", "Elyndra", "Morvath", "Thalmyr"];
const personajeAleatorio = numeroAletorio(0, personajesDisponibles.length - 1);
let nombreEnemigo = personajesDisponibles[personajeAleatorio];
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const nombre = document.createElement("p");
const imagenEnemigo = document.createElement("img");

//variables para la funtion crear mensaje
const sectionMensajes = document.getElementById("resultado");
const ataquesDeljugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");

//variables para la funtion combate
const spanVictoriasJugador = document.getElementById("victorias-jugador");
const spanVictoriasEnemigo = document.getElementById("victorias-enemigo");
const rondasTotales = 5;

let jugadorId = null
let botones = []
let indexAtaqueJugador
let indexAtaqueJugadorEnemigo
let bestiarios = []
let ataqueBestia = []
let ataqueBestiaEnemigo = []
let victoriasJugador = 0;
let victoriasEnemigos = 0;
let opcionDeBestias
let opcionDeAtaque
let botonTierra
let botonAgua
let botonFuego
let botonAire
let botonRayo
let ataqueJugadorSeleccionado = "";
let ataqueEnemigoSeleccionado = "";
let rondasJugadas = 0;
let ataquesDisponiblesEnemigo = ["FUEGO", "AGUA", "TIERRA", "AIRE", "RAYO"];


const contenedorDeTarjetas = document.getElementById("contenedorDeTarjetas");
const contenedorDeAtaque = document.getElementById("contenedorDeAtaque");

class Bestiario
{
    constructor(nombre, foto, vida)
    {
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataque = []
    }
}

let Drakvar = new Bestiario("Drakvar", "./imagenes/tarjeta1.png", 3);
let Sylplora = new Bestiario("Sylplora", "./imagenes/tarjeta2.png", 3);
let Varganox = new Bestiario("Varganox", "./imagenes/tarjeta3.png", 3);
let Elyndra = new Bestiario("Elyndra", "./imagenes/tarjeta4.png", 3);
let Morvath = new Bestiario("Morvath", "./imagenes/tarjeta5.png", 3);
let Thalmyr = new Bestiario("Thalmyr", "./imagenes/tarjeta6.png", 3);


Drakvar.ataque.push
(
    {nombre: "FUEGO 🔥", id: "fuego"},
    {nombre: "AGUA 💧", id: "agua"},
    {nombre: "TIERRA ☘", id: "tierra"},
    {nombre: "AIRE 🌪", id: "aire"},
    {nombre: "RAYO ⚡", id: "rayo"},
)

Sylplora.ataque.push
(
    {nombre: "FUEGO 🔥", id: "fuego"},
    {nombre: "AGUA 💧", id: "agua"},
    {nombre: "TIERRA ☘", id: "tierra"},
    {nombre: "AIRE 🌪", id: "aire"},
    {nombre: "RAYO ⚡", id: "rayo"},
)

Varganox.ataque.push
(
    {nombre: "FUEGO 🔥", id: "fuego"},
    {nombre: "AGUA 💧", id: "agua"},
    {nombre: "TIERRA ☘", id: "tierra"},
    {nombre: "AIRE 🌪", id: "aire"},
    {nombre: "RAYO ⚡", id: "rayo"},
)

Elyndra.ataque.push
(
    {nombre: "FUEGO 🔥", id: "fuego"},
    {nombre: "AGUA 💧", id: "agua"},
    {nombre: "TIERRA ☘", id: "tierra"},
    {nombre: "AIRE 🌪", id: "aire"},
    {nombre: "RAYO ⚡", id: "rayo"},
)

Morvath.ataque.push
(
    {nombre: "FUEGO 🔥", id: "fuego"},
    {nombre: "AGUA 💧", id: "agua"},
    {nombre: "TIERRA ☘", id: "tierra"},
    {nombre: "AIRE 🌪", id: "aire"},
    {nombre: "RAYO ⚡", id: "rayo"},
)

Thalmyr.ataque.push
(
    {nombre: "FUEGO 🔥", id: "fuego"},
    {nombre: "AGUA 💧", id: "agua"},
    {nombre: "TIERRA ☘", id: "tierra"},
    {nombre: "AIRE 🌪", id: "aire"},
    {nombre: "RAYO ⚡", id: "rayo"},
)


bestiarios.push(Drakvar, Sylplora, Varganox, Elyndra, Morvath, Thalmyr);//todos los arreglos son asignados dentro de bestiarios

function iniciarJuego()
{
    sectionSelecionarAtaque.style.display = "";
    sectionReiniciar.style.display = "none";

    bestiarios.forEach((bestia) =>  /*por cada elemento dentro del areglo realiza una accion*/
    {
       
        opcionDeBestias = 
        `
        <input type="radio" name="mascota" id=${bestia.nombre} hidden/>
        <label class="tarjetas-de-bestiario" for=${bestia.nombre}>
            <p class="bestia">${bestia.nombre}</p>
            <img src=${bestia.foto} alt=${bestia.nombre}/>
         </label>
        `
     contenedorDeTarjetas.innerHTML += opcionDeBestias
    } )

    botonPersonaje.addEventListener("click", selecionarPersonaje);
    botonReiniciar.addEventListener("click", reiniciarJuego);

    unirseAlJuego();
}

function unirseAlJuego()
{
    fetch("http://localhost:8080/unirse")
     .then(function (res)
    {
        if (res.ok)
        {
            res.text()
                .then(function (respuesta)
            {
                console.log(respuesta)
                jugadorId = respuesta
            })
        }
    })

}

function selecionarPersonaje()
{
    sectionSelecionarAtaque.style.display = "flex";  

    for (let i = 0; i < radios.length; i++) 
    {
        if (radios[i].checked)
        {
            const nombre = radios[i].id;
            bestiaElejidaPorJugador = nombre;
            
            // Limpiar contenido anterior (por si se reinicia)
            spanMascotaJugador.innerHTML = "";
            
            // Crear y agregar nombre
            texto.textContent = nombre;
            
            // Crear y agregar imagen
            imagen.src = imagenes[nombre];
            imagen.alt = nombre;
            imagen.style.width = "140px";
            imagen.style.display = "block";
            imagen.style.margin = "0 auto";

            spanMascotaJugador.appendChild(texto);
            spanMascotaJugador.appendChild(imagen);

            extraerAtaques(bestiaElejidaPorJugador);
            selecionarPersonajeEnemigo(); // también muestra imagen del enemigo
            
            sectionSelecionarPj.style.display = "none";
            seleccionarBestia(bestiaElejidaPorJugador);
           
            return;
        }
    }
    alert("Seleciona un personaje");
    reiniciarJuego();
}

function seleccionarBestia(bestiaElejidaPorJugador)
{
    console.log("Enviando bestia del jugador:", bestiaElejidaPorJugador);
    console.log("ID del jugador:", jugadorId);

    fetch(`http://localhost:8080/bestiario/${jugadorId}`,
        {
            method: "post",
            headers:
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    bestiaJugador: bestiaElejidaPorJugador
                })
        });
}

function seleccionarAtaqueJugador(ataque) 
{
    if (ataqueBestia.length >= 5) {
        return; // ya se jugaron 5 rondas
    }

    ataqueBestia.push(ataque);

    let ataqueEnemigo = obtenerAtaqueEnemigoAleatorio();
    ataqueBestiaEnemigo.push(ataqueEnemigo);

    combate(); // aquí llamamos al combate inmediato
}


function extraerAtaques(bestiaElejidaPorJugador)
{
    let ataques
    for (let i = 0; i < bestiarios.length; i++)
    {
         if (bestiaElejidaPorJugador === bestiarios [i].nombre)
         {
             ataques = bestiarios [i].ataque//este ataque se refiere a el nombre del areglo declarado con la cantidad y tipo
            }
    }
    mostrarAtaques(ataques);
}

function mostrarAtaques(ataques)
{
       ataques.forEach((atacar) =>
    {
        opcionDeAtaque =
        `
            <button class="boton-de-ataque" id=${atacar.id}>${atacar.nombre}</button>
            
            `
            contenedorDeAtaque.innerHTML += opcionDeAtaque
        })

        botonFuego = document.getElementById("fuego");
        botonAgua = document.getElementById("agua");
        botonTierra = document.getElementById("tierra");
        botonAire = document.getElementById("aire");
        botonRayo = document.getElementById("rayo");
        botones = document.querySelectorAll(".boton-de-ataque");//toma todos los elementos dentro de una clase
       

    }

    function secuenciaAtaque() 
{
        botones.forEach((boton) => {
            boton.addEventListener("click", (e) => {
                // Comprobar el ataque del jugador según el texto del botón
                if (e.target.textContent === "FUEGO 🔥") {
                    ataqueBestia.push("FUEGO");
                    boton.style.background = "grey";
                    boton.disabled = true; // Deshabilitar botón después de usarlo
                } else if (e.target.textContent === "AGUA 💧") {
                    ataqueBestia.push("AGUA");
                    boton.style.background = "grey";
                    boton.disabled = true;
                } else if (e.target.textContent === "AIRE 🌪") {
                    ataqueBestia.push("AIRE");
                    boton.style.background = "grey";
                    boton.disabled = true;
                } else if (e.target.textContent === "TIERRA ☘") {
                    ataqueBestia.push("TIERRA");
                    boton.style.background = "grey";
                    boton.disabled = true;
                } else if (e.target.textContent === "RAYO ⚡") {
                    ataqueBestia.push("RAYO");
                    boton.style.background = "grey";
                    boton.disabled = true;
                }
    
                // Ataque aleatorio del enemigo
                ataqueAleatorioEnemigo();
    
                // Comienza el combate después de que ambos jugadores hayan atacado
                ataqueJugadorSeleccionado = ataqueBestia[ataqueBestia.length - 1];
                ataqueEnemigoSeleccionado = ataqueBestiaEnemigo[ataqueBestiaEnemigo.length - 1];
    
                // Ejecutar el combate
                combate();
            });
        });
}
    

function selecionarPersonajeEnemigo()
{
  // Filtrar personajes distintos al elegido por el jugador
  let opcionesEnemigo = bestiarios.filter(personaje => personaje.nombre !== bestiaElejidaPorJugador);

  // Elegir uno aleatorio
  let aleatorio = Math.floor(Math.random() * opcionesEnemigo.length);
  nombreEnemigo = opcionesEnemigo[aleatorio].nombre;

    spanMascotaEnemigo.innerHTML = ""; // Limpiar contenido anterior si hay
    
        // Mostrar nombre
    nombre.textContent = nombreEnemigo;

    // Crear imagen
    imagenEnemigo.src = imagenes[nombreEnemigo];
    imagenEnemigo.alt = nombreEnemigo;
    imagenEnemigo.style.width = "140px"; // Ajustá según tu diseño
    imagenEnemigo.style.display = "block";
    imagenEnemigo.style.margin = "0 auto";
 
    // Agregar nombre e imagen al contenedor
    spanMascotaEnemigo.appendChild(nombre);
    spanMascotaEnemigo.appendChild(imagenEnemigo);

    secuenciaAtaque()

    // Desactivar el botón
    botonPersonaje.disabled = true;

    
 }
 
function obtenerIconoAtaque(ataque)
{
    switch (ataque) {
        case "FUEGO":
            return "🔥";
        case "AGUA":
            return "💧";
        case "TIERRA":
            return "☘";
        case "AIRE":
            return "🌪";
        case "RAYO":
            return "⚡"    
        default:
            return "";
    }
}

function ataqueAleatorioEnemigo()
{
    if (ataquesDisponiblesEnemigo.length === 0) {
        return;
    }

    let aleatorio = Math.floor(Math.random() * ataquesDisponiblesEnemigo.length);
    let ataque = ataquesDisponiblesEnemigo[aleatorio];

    ataqueBestiaEnemigo.push(ataque);
    ataquesDisponiblesEnemigo.splice(aleatorio, 1);
}


function numeroAletorio(min, max)
{
    return Math.floor(Math.random()*(max - min + 1)) + min;
};


function crearMensaje(resultado) 
{
    // Limpiar mensajes anteriores
    ataquesDeljugador.innerHTML = "";
    ataquesDelEnemigo.innerHTML = "";

    let nuevoAtaqueDelJugador = document.createElement("p");
    let nuevoAtaqueDelEnemigo = document.createElement("p");
    let resultadoParcial = document.createElement("p");

    nuevoAtaqueDelJugador.innerHTML = "Atacaste con: " + ataqueJugadorSeleccionado + " " + obtenerIconoAtaque(ataqueJugadorSeleccionado);
    nuevoAtaqueDelEnemigo.innerHTML = "El enemigo atacó con: " + ataqueEnemigoSeleccionado + " " + obtenerIconoAtaque(ataqueEnemigoSeleccionado);

    resultadoParcial.innerHTML = resultado;

    // Agregar el mensaje de resultado a la sección de mensajes
    sectionMensajes.innerHTML = ""; // Limpiar mensajes anteriores
    sectionMensajes.appendChild(resultadoParcial);

    // Mostrar los ataques realizados
    ataquesDeljugador.appendChild(nuevoAtaqueDelJugador);
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}


function combate()
{
    let index = ataqueBestia.length - 1;
    let ataqueJugador = ataqueBestia[index];
    let ataqueEnemigo = ataqueBestiaEnemigo[index];

    indexAtaqueJugador = ataqueJugador;
    indexAtaqueJugadorEnemigo = ataqueEnemigo;

    if (ataqueJugador === ataqueEnemigo) {
        crearMensaje("Ronda Empatada");
    } else if (
        (ataqueJugador === "FUEGO" && (ataqueEnemigo === "TIERRA" || ataqueEnemigo === "AIRE")) ||
        (ataqueJugador === "AGUA" && (ataqueEnemigo === "FUEGO" || ataqueEnemigo === "RAYO")) ||
        (ataqueJugador === "TIERRA" && (ataqueEnemigo === "AGUA" || ataqueEnemigo === "RAYO")) ||
        (ataqueJugador === "AIRE" && (ataqueEnemigo === "AGUA" || ataqueEnemigo === "TIERRA")) ||
        (ataqueJugador === "RAYO" && (ataqueEnemigo === "FUEGO" || ataqueEnemigo === "AIRE"))
    ) {
        crearMensaje("Ganaste la Ronda");
        victoriasJugador++;
        spanVictoriasJugador.innerHTML ="Tienes " + victoriasJugador + " victoria";
    } else {
        crearMensaje("Perdiste la Ronda");
        victoriasEnemigos++;
        spanVictoriasEnemigo.innerHTML ="El enemigo tiene " + victoriasEnemigos + " victoria";
    }

     rondasJugadas ++;

     if (rondasJugadas === rondasTotales)
    {
        controlVictorias();
    }
}

function controlVictorias()
{
    if (victoriasJugador === victoriasEnemigos)
    {
        crearMensajeFinal("EMPATE !!! 😮😮😮");
    }
    else if (victoriasJugador > victoriasEnemigos)
    {
        crearMensajeFinal("GANASTE ✌✌✌")
    }
    else
    {
        crearMensajeFinal("Perdiste 😣😣😣")
    }
}

function crearMensajeFinal(resultadoFinal)
{
    juegoTerminado = true;

    sectionMensajes.innerHTML = resultadoFinal


    sectionReiniciar.style.display = "block"
}

function reiniciarJuego()
{
   location.reload()
}

// Seleccionamos todas las tarjetas
const tarjetas = document.querySelectorAll('.tarjetas-de-bestiario');


window.addEventListener("load", iniciarJuego);