import React, {useState, useEffect} from 'react'
import EnTurApiService from '../services/EnTurApiService'
import { Rute } from './Rute'
import metroIcon from './metro.svg'
import tramIcon from './tram.svg'



const moment = require('moment');
moment().format("HH:mm");



export const DisplayRuter = () => {

    const [tramDepartures, setTramDepartures] = useState([])
    const [metroDepartures, setMetroDepartures] = useState([])
  

    const createRoutes = (departures) => {
        
        const createRoute = (departure) => {
        
        
            const newDeparture = {
                departureTime: moment(departure.expectedDepartureTime).format("HH:mm"),
                name: departure.destinationDisplay.frontText
            }
    
            return newDeparture
        }

        return departures.map((departure) => createRoute(departure))
    }


    const refresh = () => {
        console.log("Refreshing departures...")
        EnTurApiService.getTramDepartures().then((departure) => {
            setTramDepartures(createRoutes(departure.quay.estimatedCalls))
        })
        .then(() => {
            EnTurApiService.getMetroDepartures().then((departure) => {
                setMetroDepartures(createRoutes(departure.quay.estimatedCalls))
            })
        })
        .then(() => { // they print blank, why?
               // console.log(tramDepartures)
                //console.log(metroDepartures)     
        })
        // chaining promises to allow sequential calls. Is this needed?
    
      
    }

    const hook = () => {
        refresh()
        setInterval(refresh, 10000)
    }

    useEffect(hook, []) // hook is called once
    
    return (
        <div>
            <h1>Tram </h1> <img className="icon" src={tramIcon}></img>
            <ul className="list">
               {tramDepartures.map((departure) => (
                   <Rute key={departure.id} name={departure.name} departureTime={departure.departureTime}></Rute>
               ))}
            </ul>
            <h1>Metro</h1> <img className="icon" src={metroIcon}></img>
            <ul className="list">
               {metroDepartures.map((departure) => (
                   <Rute key={departure.id} name={departure.name} departureTime={departure.departureTime}></Rute>
               ))}
            </ul>
        </div>
    )
}
