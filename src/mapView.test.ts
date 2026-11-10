import { describe, expect, it } from 'vitest'
import { defaultMapView, updateMapView, viewBox } from './mapView'
describe('map viewport', () => {
  it('zooms around the center and resets', () => { const zoomed = updateMapView(defaultMapView, 'in'); expect(zoomed).toEqual({ x: 14, y: 14, size: 72 }); expect(viewBox(zoomed)).toBe('14 14 72 72'); expect(updateMapView(zoomed, 'reset')).toEqual(defaultMapView) })
  it('keeps panning inside the projected map', () => { let view = updateMapView(defaultMapView, 'in'); for (let index = 0; index < 20; index += 1) view = updateMapView(view, 'left'); expect(view.x).toBe(0) })
})
