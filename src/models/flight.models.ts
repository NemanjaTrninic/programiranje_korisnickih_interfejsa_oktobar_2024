export interface FlightModel {
    id: number
    type: {
        id: number
        name: string

    }
    flightKey: string
    flightNumber: string
    destination: string
    scheduledAt: string
    estimatedAt: string | null
    connectedtype: number
    connectedFlight: string | null
    plane: string
    gate: string | null
    terminal: string

}