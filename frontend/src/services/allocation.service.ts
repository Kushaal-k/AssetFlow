import { mockAllocations, type Allocation } from '../mocks/allocations.mock'

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export const allocationService = {
  getAll: async (): Promise<Allocation[]> => {
    await delay()
    return [...mockAllocations]
  },
  getByEmployeeId: async (employeeId: string): Promise<Allocation[]> => {
    await delay()
    return mockAllocations.filter((a) => a.employeeId === employeeId)
  },
  allocate: async (data: Omit<Allocation, 'id' | 'status'>): Promise<Allocation> => {
    await delay(500)
    return { ...data, id: String(Date.now()), status: 'allocated' }
  },
  deallocate: async (id: string): Promise<void> => {
    await delay(500)
    console.log('Deallocated', id) // stub
  },
}
