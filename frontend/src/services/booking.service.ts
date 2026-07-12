import { mockBookings, type Booking } from '../mocks/bookings.mock'

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export const bookingService = {
  getAll: async (): Promise<Booking[]> => {
    await delay()
    return [...mockBookings]
  },
  create: async (data: Omit<Booking, 'id' | 'status'>): Promise<Booking> => {
    await delay(500)
    return { ...data, id: String(Date.now()), status: 'pending' }
  },
  cancel: async (id: string): Promise<void> => {
    await delay(500)
    console.log('Cancelled booking', id) // stub
  },
}
