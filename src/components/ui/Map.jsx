"use client";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/components/ui/Map.css";
import MarkerIcon from "../assets/venue_location_icon.svg";

const DraggableMarker = ({ onPositionChange, initialLat, initialLng }) => {
  const [draggable, setDraggable] = useState(false);
  const markerRef = useRef(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          onPositionChange(newPosition.lat, newPosition.lng); // Corregido para llamar correctamente a onPositionChange
        }
      },
      click() { // Línea agregada
        setDraggable(true); // Línea agregada
      },
    }),
    [onPositionChange]
  );

  const toggleDraggable = () => {
    setDraggable((d) => !d);
  };

  return (
    <Marker
      icon={
        new L.Icon({
          iconUrl: MarkerIcon.src,
          iconRetinaUrl: MarkerIcon.src,
          iconSize: [25, 41],
          iconAnchor: [12.5, 41],
          popupAnchor: [0, -41],
          shadowSize: [41, 41],
        })
      }
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={{ lat: initialLat, lng: initialLng }}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable ? "Puedes mover el marcador" : "Haz click sobre el texto para poder situarlo"}
        </span>
        <p>Latitud: {initialLat} Longitud: {initialLng}</p>
      </Popup>
    </Marker>
  );
};

const DraggableMarkerMap = ({ lat, lng, onPositionChange }) => {
  return (
    <>
      <MapContainer center={{ lat, lng }} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker onPositionChange={onPositionChange} initialLat={lat} initialLng={lng} />
      </MapContainer>
    </>
  );
};

export default DraggableMarkerMap;
