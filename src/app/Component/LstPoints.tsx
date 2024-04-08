import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface Point {
    lat: number;
    lng: number;
}

interface GoogleMapsProps {
    onMapClick: (lat: number, lng: number) => void;
    points: Point[];
}

export default function LstGoogleMaps({ onMapClick, points }: GoogleMapsProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<google.maps.Marker[]>([]);

    useEffect(() => {
        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
                version: "weekly",
                libraries: ["places"]
            });

            await loader.load();
            const map = new google.maps.Map(mapRef.current as HTMLDivElement, {
                center: { lat: -17.393390, lng: -66.178033 },
                zoom: 15,
                mapId: 'NEXT_MAPS_TUTS',
            });

            // Clear existing markers
            markersRef.current.forEach(marker => marker.setMap(null));

            // Create markers for each point
            markersRef.current = points.map(point => new google.maps.Marker({
                position: point,
                map: map,
                title: "Ubicación seleccionada",
            }));

            // Set up click event listener
            map.addListener("click", (event: google.maps.MapMouseEvent) => {
                const latLng = event.latLng;
                const lat: number = latLng?.lat() || 0
                const lng: number = latLng?.lng() || 0;

                onMapClick(lat, lng);
            });

    
        };

        initializeMap();
    }, [points, onMapClick]);

    return <div className='google-div' ref={mapRef}>Load...</div>;
}
