import { mockMaintenanceRequests, type MaintenanceRequest } from '../mocks/maintenance.mock'

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export const maintenanceService = {
  getAll: async (): Promise<MaintenanceRequest[]> => {
    await delay()
    return [...mockMaintenanceRequests]
  },
  create: async (data: Omit<MaintenanceRequest, 'id' | 'status' | 'resolvedAt'>): Promise<MaintenanceRequest> => {
    await delay(500)
    return { ...data, id: String(Date.now()), status: 'open', resolvedAt: null }
  },
  approve: async (id: string): Promise<void> => {
    await delay(500)
    console.log('Approved maintenance', id) // stub
  },
  resolve: async (id: string): Promise<void> => {
    await delay(500)
    console.log('Resolved maintenance', id) // stub
  },
  close: async (id: string): Promise<void> => {
    await delay(500)
    console.log('Closed maintenance', id) // stub
  },
}
