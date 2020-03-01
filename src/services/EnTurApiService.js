import axios from 'axios'

const url = 'https://api.entur.io/journey-planner/v2/graphql'
const numOfDepartures = 4

const stopPlaces = {
    tram: {
      both: 'NSR:StopPlace:6346',
      centrum: 'NSR:Quay:11662'
    }, 
    metro: {
      both: 'NSR:StopPlace:6342',
      centrum: 'NSR:Quay:11655'
    }
}


const getTramDepartures = () => {
    const request = axios.post(url, {
      // change quay(...) to stopPlaces(...) if using stopPlace
      // instead of quay 
        query: `{
          quay(id: "${stopPlaces.tram.centrum}") {
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
          quay(id: "${stopPlaces.metro.centrum}") {
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

export default {getTramDepartures, getMetroDepartures}