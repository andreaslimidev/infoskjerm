import React from 'react'

export const Rute = ({ departureTime, name}) => {
    return (
        <>
         <li>
             <p> {name}</p> <p className="time">{departureTime}</p>
             </li>   
        </>
    )
}
