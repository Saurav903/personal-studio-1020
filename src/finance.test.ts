import { describe, expect, it } from 'vitest'
import { daysBetween, healthLabel } from './finance'

describe('finance helpers', () => {
  it('calculates calendar runway days', () => expect(daysBetween('2026-10-20', '2026-10-29')).toBe(9))
  it('labels runway health', () => { expect(healthLabel(2500)).toBe('Comfortable'); expect(healthLabel(900)).toBe('Tight') })
})
