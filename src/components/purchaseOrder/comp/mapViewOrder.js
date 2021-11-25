import React, { useEffect, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';


export default function MapViewOrder({ supplierMap, deliverMap }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCPy78uNk-DG98yYv7bGEWt3SCidRf0dms"
  })

  const [center, setCenter] = useState({
    lat: 13.363175493211273,
    lng: 103.85653437154804
  })

  useEffect(() => {
    if(supplierMap){
      setCenter(supplierMap)
    }
  }, [supplierMap])

  // console.log(deliverMap)

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{
        width: '100%',
        height: '100%'
      }}
      center={center}
      zoom={14}
    // onLoad={onLoad}
    // onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */}
      <Marker
        key="customer"
        position={supplierMap}
      />
      {
        deliverMap !== {} && <Marker
          key="deliver"
          position={deliverMap}
        />
      }

    </GoogleMap>
  ) : <></>
}