import React, { useRef } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';


export default function MapAddOrder({ data, setData }) {
    let refMap = useRef()
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCPy78uNk-DG98yYv7bGEWt3SCidRf0dms"
    })

    const centerMoved = () => {
        setData({
            lat: refMap?.current?.state?.map?.center?.lat(),
            long: refMap?.current?.state?.map?.center?.lng()
        })
    };

    return isLoaded ? (
        <GoogleMap
            ref={refMap}
            mapContainerStyle={{
                width: '100%',
                height: '100%'
            }}
            center={{
                lat: data?.lat,
                lng: data?.long,
            }}
            zoom={12}
            onBoundsChanged={centerMoved}
        >

            {/* <Marker
                key="customer"
                position={{
                    lat: data.lat,
                    lng: data.long
                }}
            /> */}
        </GoogleMap>
    ) : <></>
}