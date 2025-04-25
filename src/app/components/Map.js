'use client';

import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map() {
    const mapRef = useRef(null);
    const [geocoder, setGeocoder] = useState(null);
    const [map, setMap] = useState(null);
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
          version: "weekly",
        });
      
        loader.load().then(() => {
          if (!window.google || !window.google.maps) {
            console.error("Google Maps failed to load.");
            return;
          }
      
          setGeocoder(new google.maps.Geocoder());
        });
      }, []);
      
      useEffect(() => {
        if (!window.google || !window.google.maps) return;
      
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const currentLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
      
              const mapInstance = new google.maps.Map(mapRef.current, {
                center: currentLocation,
                zoom: 15,
              });
      
              new google.maps.Marker({
                map: mapInstance,
                position: currentLocation,
                label: "You",
              });
      
              setMap(mapInstance);
            },
            () => {
              console.warn("Geolocation permission denied or unavailable.");
            }
          );
        } else {
          console.warn("Geolocation is not supported by this browser.");
        }
      }, []);
      
    return <div style={{ height: "400px", width: "900px" }} ref={mapRef} />;
}
