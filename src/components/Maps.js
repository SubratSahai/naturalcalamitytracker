import React from "react";
import GoogleMapReact from 'google-map-react';
import LocationMarker from "./LocationMarker";
import { useState } from "react";
import LocationInfo from "./LocationInfo";
import MarkerStorm from "./MarkerStorm";


const Map = ({ eventdata, center, zoom }) => {
  let [locationinfo, setlocationinfo] = useState(null);




  let markers = eventdata.map(ev => {
    if (ev.categories[0].id === 8) {
      return <LocationMarker lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={() => {
        setlocationinfo({ id: ev.id, title: ev.title })
      }} />
    }
    return null
  });

  // PREVIOUS CODE------------------
  // let markerfire= eventdata.map(ev=>{
  //   //  if(ev.categories[0].id == 10) {
  //   //    return ev.geometries.map(item =>  {
  //   //      console.log(item)
  //   //      return  <MarkerStorm  lat={item.coordinates[1]} lng={item.coordinates[0]} onClick={()=> {
  //   //        setlocationinfo({id:ev.id,title:ev.title})
  //   //      }}/>}
  //   //    )
  //   //  }

  //   if(ev?.categories[0]?.id === 10){
  //     return  <MarkerStorm  lat={ev.geometries[0].coordinates[1]} lng={ev.geometries[0].coordinates[0]} onClick={()=> {
  //       setlocationinfo({id:ev.id,title:ev.title})
  //     }}/>
  //   }
  // });
  // END------------


  // START-----------
  let markerfire = () => {
    const storms = []; // create storms array where all the storms will be stored
    eventdata
      .filter(ev => ev?.categories[0]?.id == 10) // filter arrays that has category 10
      .map(ev => { // map over arrays that has cat = 10
        return ev.geometries.map(gm => storms.push({ // map over geometries array inside each event where cat = 10
          // assign values like long, lat, etc to be used and push the storms array
          lat: gm.coordinates[1],
          lon: gm.coordinates[0],
          id: ev.id,
          title: ev.title
        }))
      })

    // At this point storms array has all the geometries for storms now we just need to return the react obj for each geometry
    return storms.map(st => (
      <MarkerStorm lat={st.lat} lng={st.lon} onClick={() => {
        setlocationinfo({ id: st.id, title: st.title })
      }} />
    ))
  }
  // END-----------

  return (

    <div style={{ height: '100vh', width: '100%', position: "relative" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {markers}
        {markerfire()}
      </GoogleMapReact>
      {locationinfo && <LocationInfo info={locationinfo} />}

    </div>
  );
}
Map.defaultProps = {
  center: {
    lat: 5,
    lng: 5
  },
  zoom: 0
};
export default Map;
