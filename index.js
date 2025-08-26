const express = require("express");
const cors = require("cors");// libreria que me da permisos de accseso

const app = express()

app.use(cors())// pedido para utilizar la libreria de accseso
app.use(express.json()) // Abilita a el servidor a recibir perdidos en json

const jugadores = []

class Jugador 
{
    constructor(id)
    {
        this.id = id
    }

    asignarBestia(bestia)
    {
        this.bestia = bestia
    }
}

class Bestia
{
    constructor(nombre)
    {
        this.nombre = nombre
    }
}

app.get("/unirse", (req, res) =>
 {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    console.log("Jugador conectado con ID:", id);

    console.log("Jugadores actuales:", jugadores);

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
 })

app.post("/bestiario/:jugadorId", (req, res) =>
{
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.bestiaJugador || ""
    const bestia = new Bestia(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    
    if (jugadorIndex >= 0)
    {
        jugadores[jugadorIndex].asignarBestia(bestia)
        console.log("✅ Bestia asignada:", bestia.nombre)
    } else {
        console.log("❌ Jugador no encontrado con ID:", jugadorId)
    }

    // Mostrar todos los jugadores con sus bestias
    const estadoJugadores = jugadores.map(jugador => ({
        id: jugador.id,
        bestia: jugador.bestia ? jugador.bestia.nombre : null
    }))
    
    console.table(estadoJugadores)

    res.end();
})



app.listen(8080, () =>
 {
    console.log("servidor funcionando")
 })