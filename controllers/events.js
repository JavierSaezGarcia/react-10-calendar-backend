const { response } = require('express');
const Event = require('../models/Event');


const createEvent = async (req, res = response) => {
    // verificar el evento
    const event = new Event(req.body);
    try {
        
        event.user = req.uid;
        
        const eventoGuardado = await event.save();
        res.json({
            ok: true,
            event: eventoGuardado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }


}

const getEvents = async (req, res = response) => {
    try {
        const events = await Event.find().populate('user', 'name');
        res.json({
            ok: true,
            events
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
    // Con find() tendriamos todos los eventos
    // con populate('user', 'name') traemos el nombre e id del usuario

}





const updateEvent = async (req, res = response) => {

    const eventoId = req.params.id; // por parametros de la request
    const uid = req.uid;

    try {

        const evento = await Event.findById( eventoId ); 
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado con ese id'
            })
        }
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        // El tercer argumento es para que nos devuelva el nuevo evento actualizado con { new: true }
        const eventUpdated = await Event.findByIdAndUpdate(eventoId, nuevoEvento,{ new: true } );
        res.status(201).json({
            ok: true,
            event: eventUpdated
        })       

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }
}

const deleteEvent = async(req, res = response) => {

    const eventoId = req.params.id; // ide del evento por parametros de la url
    const uid = req.uid; // uid por la request
    try {
        const evento = await Event.findById( eventoId );  // busco el evento por ide
        if (!evento) { // si el evento es null
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado con ese id'
            })
        }
        if (evento.user.toString() !== uid) { // si no hace match el user id del evento y la uid de la request
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de borrar este evento'
            })
        }

        await Event.findByIdAndDelete(eventoId); 
        res.status(201).json({
            ok: true,
            event: `Evento borrado con exito con id: ${eventoId} `
        })    
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

        
    }
   


}



module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}