import { mockAssets, type Asset } from '../mocks/assets.mock'

// Simulates async API call - replace body with real axios call when backend is ready
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export const assetService = {
  getAll: async (): Promise<Asset[]> => {
    await delay()
    return [...mockAssets]
  },
  getById: async (id: string): Promise<Asset | undefined> => {
    await delay()
    return mockAssets.find((a) => a.id === id)
  },
  create: async (data: Omit<Asset, 'id'>): Promise<Asset> => {
    await delay(500)
    const newAsset: Asset = { ...data, id: String(Date.now()) }
    return newAsset
  },
  update: async (id: string, data: Partial<Asset>): Promise<Asset> => {
    await delay(500)
    const existing = mockAssets.find((a) => a.id === id)
    if (!existing) throw new Error('Asset not found')
    return { ...existing, ...data }
  },
  delete: async (id: string): Promise<void> => {
    await delay(500)
    console.log('Deleted asset', id) // stub
  },
}
