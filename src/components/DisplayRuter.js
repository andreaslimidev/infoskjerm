import React, {useState, useEffect} from 'react'
import EnTurApiService from '../services/EnTurApiService'
import { Rute } from './Rute'

const axios = require('axios')



export const DisplayRuter = () => {

    const [tramDepartures, setTramDepartures] = useState([])
    const [metroDepartures, setMetroDepartures] = useState([])
  


    const createRoute = (departure) => {
        
        const newDeparture = {
            departureTime: departure.expectedDepartureTime,
            name: departure.destinationDisplay
        }

        return newDeparture
    }


    const refresh = () => {
        
        EnTurApiService.getTramDepartures().then((departure) => {
            setTramDepartures(departure.stopPlace.estimatedCalls)
        })
    }

    const hook = () => {

        console.log("running")
        EnTurApiService.getTramDepartures().then((departure) => {
            setTramDepartures(departure.stopPlace.estimatedCalls)
        })
        
        setInterval(refresh, 3000)
        
    }

    useEffect(hook, [])
    console.log(tramDepartures)

    
    return (
        <div>
            <h1>Tram</h1>
            <ul>
               {tramDepartures.map((departure) => (
                   <Rute key={departure.key}></Rute>
               ))}
            </ul>
        </div>
    )
}
