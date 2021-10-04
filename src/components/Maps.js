import React from "react";
import GoogleMapReact from 'google-map-react';
import LocationMarker from "./LocationMarker";
import { useState } from "react";
import LocationInfo from "./LocationInfo";
import MarkerStorm from "./MarkerStorm";


 const Map=({eventdata,center,zoom})=>{
let [locationinfo,setlocationinfo]=useState(null);




  let markers=eventdata.map(ev=>{
    if(ev.categories[0].id === 8){
      return  <LocationMarker  lat={ev.geometries[0].coordinates[1]}  lng={ev.geometries[0].coordinates[0] } onClick={()=> {
        setlocationinfo({id:ev.id,title:ev.title})
      }}/>
    }
    return null
  });

  let markerfire= () => {
   return  eventdata.map(ev=>{
     if(ev.categories[0].id == 10) {
       return ev.geometries.map(item =>  {
         console.log(item)
         return  <MarkerStorm  lat={item.coordinates[1]} lng={item.coordinates[0]} onClick={()=> {
           setlocationinfo({id:ev.id,title:ev.title})
         }}/>}
       )
     }

    // if(ev.categories[0].id === 10){
    //   return  <MarkerStorm  lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]}onClick={()=> {
    //     setlocationinfo({id:ev.id,title:ev.title})
    //   }}/>
    // }
    // return null
  });
  }

  return (
    
    <div style={{ height: '100vh', width: '100%',position:"relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
       {markers}
       {
         console.log("marker fire", markerfire())
       }
       {markerfire}
      </GoogleMapReact>
      {locationinfo && <LocationInfo info={locationinfo}/>}
      
    </div>
  );
}
Map.defaultProps = {
    center: {
      lat:5,
      lng:5
    },
    zoom: 0
  };
export default Map;
