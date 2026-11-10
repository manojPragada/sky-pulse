export type MapView = { x: number; y: number; size: number }
export type MapAction = 'up' | 'down' | 'left' | 'right' | 'in' | 'out' | 'reset'
export const defaultMapView: MapView = { x: 0, y: 0, size: 100 }
export function updateMapView(view: MapView, action: MapAction): MapView {
  if (action === 'reset') return { ...defaultMapView }
  const size = action === 'in' ? Math.max(35, view.size * .72) : action === 'out' ? Math.min(100, view.size / .72) : view.size
  const centeredX = view.x + (view.size - size) / 2
  const centeredY = view.y + (view.size - size) / 2
  const step = size * .14
  const x = centeredX + (action === 'left' ? -step : action === 'right' ? step : 0)
  const y = centeredY + (action === 'up' ? -step : action === 'down' ? step : 0)
  return { x: Math.max(0, Math.min(100 - size, x)), y: Math.max(0, Math.min(100 - size, y)), size }
}
export const viewBox = ({ x, y, size }: MapView) => `${x} ${y} ${size} ${size}`
