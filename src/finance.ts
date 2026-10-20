export type Envelope = { name: string; icon: string; allocated: number; spent: number; tone: string }

export const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
export const daysBetween = (from: string, to: string) => Math.max(0, Math.ceil((new Date(to).getTime() - new Date(from).getTime()) / 86400000))
export const healthLabel = (runway: number) => runway >= 2200 ? 'Comfortable' : runway >= 1200 ? 'Mindful' : 'Tight'
export const demoEnvelopes: Envelope[] = [
  { name: 'Home rhythm', icon: '⌂', allocated: 12000, spent: 6900, tone: 'coral' },
  { name: 'Food & coffee', icon: '◒', allocated: 7500, spent: 3240, tone: 'mint' },
  { name: 'City moves', icon: '↗', allocated: 2600, spent: 1120, tone: 'blue' },
  { name: 'Small joys', icon: '✦', allocated: 4200, spent: 1640, tone: 'violet' },
]
