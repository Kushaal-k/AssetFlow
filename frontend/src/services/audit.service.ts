import { mockAuditItems, type AuditItem } from '../mocks/audit.mock'
import type { AuditStatus } from '@/components/ui/status-badge'

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms))

export const auditService = {
  getAll: async (): Promise<AuditItem[]> => {
    await delay()
    return [...mockAuditItems]
  },
  updateStatus: async (id: string, status: AuditStatus, notes?: string): Promise<void> => {
    await delay(400)
    console.log('Updated audit item', id, status, notes) // stub
  },
}
