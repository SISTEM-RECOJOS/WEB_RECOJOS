"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';


interface GoogleMapsProps {
    onMapClick: (lat:number,lng:number) => void;
}

export default function GoogleMaps({onMapClick} : GoogleMapsProps) {

    const mapRef = useRef<HTMLDivElement>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "weekly",
                libraries: ["places"]
            });

            await loader.load();
            const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
                center: { lat: 39.60128890889341, lng: -9.069839810859907 },
                zoom: 15,
                mapId: 'NEXT_MAPS_TUTS',
            });

            map.addListener("click", (event: google.maps.MapMouseEvent) => {
                const latLng = event.latLng;
                const lat:number|undefined = latLng?.lat() === undefined ? 0 : latLng?.lat();
                const lng:number|undefined = latLng?.lng()=== undefined ? 0 : latLng?.lng();
                if (markerRef.current) {
                    markerRef.current.setPosition(latLng);
                } else {
                    markerRef.current = new google.maps.Marker({
                        position: latLng,
                        map: map,
                        title: "Ubicación seleccionada",
                    });
                }
                onMapClick(lat,lng)
            });
        };

        initializeMap();
    }, []);

    return <div style={{ width: "100%", height: "100%" }} ref={mapRef}>Load...</div>;
}
