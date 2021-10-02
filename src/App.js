import { useState ,useEffect } from "react";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Map from "./components/Maps.js";
function App() {
 let [eventdata,seteventdata]=  useState([]);
 let [loading,setloading]= useState(false);

 useEffect(() => {
   const fetchEvents=async () =>{
     setloading(true)
     let res= await fetch('https://eonet.sci.gsfc.nasa.gov/api/v2.1/events')
     let {events}=await res.json()
     
     seteventdata(events)
     setloading(false)
   }
  
  fetchEvents()
 }, [])
 console.log(eventdata)
  return (
    <div >
      <Header/>
      {!loading ? <Map eventdata={eventdata}/> : <div><Loader/></div>}
    </div>
  );
}

export default App;
