import axios from 'axios'

const url = 'https://api.entur.io/journey-planner/v2/graphql'
const numOfDepartures = 2

const stopPlaces = {
    tram: 'NSR:StopPlace:6346',
    metro: 'NSR:StopPlace:6342'
}


const getTramDepartures = () => {
    const request = axios.post(url, {
        query: `{
          stopPlace(id: "${stopPlaces.tram}") {
            id
            name
            estimatedCalls(timeRange: 72100, numberOfDepartures: ${numOfDepartures}) {
              expectedDepartureTime
              destinationDisplay {
                frontText
              }
              serviceJourney {
                journeyPattern {
                  line {
                    id
                    transportMode
                  }
                }
              }
            }
          }
        }
        `})
    
   // return request.then((request) => request.data.data).then((response) => (response.data))
     return request.then((request) => request.data.data)
}

const getMetroDepartures = () => {
    const request = axios.post(url, {
        query: `{
          stopPlace(id: "${stopPlaces.metro}") {
            id
            name
            estimatedCalls(timeRange: 72100, numberOfDepartures: ${numOfDepartures}) {
              expectedDepartureTime
              destinationDisplay {
                frontText
              }
              serviceJourney {
                journeyPattern {
                  line {
                    id
                    transportMode
                  }
                }
              }
            }
          }
        }
        `})
    
    return request.then((request) => request.data.data)
}

export default {getTramDepartures}