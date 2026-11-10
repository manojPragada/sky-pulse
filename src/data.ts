export type Point={lat:number;lon:number}
export type Flight={id:string;callsign:string;from:string;to:string;altitude:number;speed:number;heading:number;position:Point;trail:readonly Point[];status:'cruise'|'climb'|'descent'}
export type Airport={code:string;city:string;name:string;position:Point}

export const airports:readonly Airport[]=[
 {code:'YYZ',city:'Toronto',name:'Toronto Pearson',position:{lat:43.68,lon:-79.63}},
 {code:'YUL',city:'Montréal',name:'Montréal–Trudeau',position:{lat:45.47,lon:-73.74}},
 {code:'JFK',city:'New York',name:'John F. Kennedy',position:{lat:40.64,lon:-73.78}},
 {code:'LHR',city:'London',name:'Heathrow',position:{lat:51.47,lon:-0.45}},
]
export const flights:readonly Flight[]=[
 {id:'demo-01',callsign:'SKY 042',from:'YYZ',to:'LHR',altitude:11280,speed:874,heading:68,position:{lat:49.8,lon:-42},trail:[{lat:43.68,lon:-79.63},{lat:46,lon:-64},{lat:48.2,lon:-52},{lat:49.8,lon:-42}],status:'cruise'},
 {id:'demo-02',callsign:'NORTH 718',from:'JFK',to:'YUL',altitude:7920,speed:642,heading:18,position:{lat:43.2,lon:-74.4},trail:[{lat:40.64,lon:-73.78},{lat:41.5,lon:-74.2},{lat:43.2,lon:-74.4}],status:'climb'},
 {id:'demo-03',callsign:'MAPLE 231',from:'YUL',to:'YYZ',altitude:3840,speed:488,heading:244,position:{lat:44.7,lon:-76.3},trail:[{lat:45.47,lon:-73.74},{lat:45.1,lon:-75},{lat:44.7,lon:-76.3}],status:'descent'},
]

export const project=(point:Point)=>({x:(point.lon+100)/110*100,y:(58-point.lat)/24*100})
export const searchAirports=(query:string)=>{const key=query.trim().toLocaleLowerCase();return key?airports.filter(a=>`${a.code} ${a.city} ${a.name}`.toLocaleLowerCase().includes(key)):airports}
