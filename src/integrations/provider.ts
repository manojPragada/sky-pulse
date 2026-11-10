export type FeedState='fresh'|'stale'|'invalid'
export type ProviderAircraft={id:string;callsign:string;lat:number;lon:number;altitudeMeters:number|null;observedAt:string;source:'provider'}
export type ProviderSnapshot={aircraft:readonly ProviderAircraft[];receivedAt:string;state:FeedState;providerLabel:string}
export type ProviderEnvelope={providerLabel?:unknown;observedAt?:unknown;aircraft?:unknown}

const finite=(value:unknown)=>typeof value==='number'&&Number.isFinite(value)
export function normalizeProviderEnvelope(envelope:ProviderEnvelope,receivedAt=new Date(),staleAfterMs=120_000):ProviderSnapshot|null{
  if(typeof envelope.providerLabel!=='string'||typeof envelope.observedAt!=='string'||!Array.isArray(envelope.aircraft))return null
  const observed=new Date(envelope.observedAt)
  if(Number.isNaN(observed.getTime())||observed.getTime()>receivedAt.getTime()+30_000)return null
  const aircraft=envelope.aircraft.flatMap((row):ProviderAircraft[]=>{
    if(!row||typeof row!=='object')return[]
    const value=row as Record<string,unknown>
    if(typeof value.id!=='string'||typeof value.callsign!=='string'||!finite(value.lat)||!finite(value.lon))return[]
    const lat=value.lat as number,lon=value.lon as number
    if(lat < -90||lat > 90||lon < -180||lon > 180)return[]
    return[{id:value.id.trim(),callsign:value.callsign.trim()||'Unknown',lat,lon,altitudeMeters:finite(value.altitudeMeters)?value.altitudeMeters as number:null,observedAt:observed.toISOString(),source:'provider'}]
  })
  const age=receivedAt.getTime()-observed.getTime()
  return{aircraft,receivedAt:receivedAt.toISOString(),state:age>staleAfterMs?'stale':'fresh',providerLabel:envelope.providerLabel.trim()}
}
