import { describe, expect, it } from 'vitest'
import { filteredFavorites, parseFavorites, serializeFavorites, toggledFavorites } from './favorites'

describe('demo flight favorites', () => {
  const ids = ['demo-01', 'demo-02']
  it('keeps only known synthetic flight IDs', () => {
    expect([...parseFavorites('["demo-01","live-unsafe",3]', ids)]).toEqual(['demo-01'])
    expect([...parseFavorites('not json', ids)]).toEqual([])
  })
  it('toggles without mutating the current set and serializes deterministically', () => {
    const current = new Set(['demo-02'])
    const next = toggledFavorites(current, 'demo-01')
    expect([...current]).toEqual(['demo-02'])
    expect(serializeFavorites(next)).toBe('["demo-01","demo-02"]')
    expect([...toggledFavorites(next, 'demo-02')]).toEqual(['demo-01'])
  })
  it('filters the demo list without reordering saved flights', () => {
    const items = ids.map((id) => ({ id }))
    expect(filteredFavorites(items, new Set(['demo-02']), true)).toEqual([{ id: 'demo-02' }])
    expect(filteredFavorites(items, new Set(), true)).toEqual([])
    expect(filteredFavorites(items, new Set(), false)).toEqual(items)
  })
})
