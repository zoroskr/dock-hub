"use client";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "@/components/ui/Map.css";
import MarkerIcon from "../assets/venue_location_icon.svg";

const DraggableMarker = ({ onPositionChange, initialLat, initialLng }) => {
  const initialPosition = { lat: initialLat, lng: initialLng }; // Usar initialLat y initialLng para la posición inicial
  const [draggable, setDraggable] = useState(false);
  const [position, setPosition] = useState(initialPosition); // Establecer la posición inicial basada en props
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          const newPosition = marker.getLatLng();
          setPosition(newPosition);
          if (onPositionChange) {
            onPositionChange(newPosition);
          }
        }
      },
    }),
    [onPositionChange]
  );
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d);
  }, []);

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
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span onClick={toggleDraggable}>{draggable ? "Puedes mover el marcador" : "Haz click sobre el texto para poder situarlo"}</span>
      </Popup>
    </Marker>
  );
};

const DraggableMarkerMap = ({ lat, lng }) => {
  const initialPosition = { lat, lng };
  const [currentPosition, setCurrentPosition] = useState(initialPosition); // Estado para almacenar la posición actual

  const handlePositionChange = (newPosition) => {
    console.log("Nueva posición del marcador:", newPosition);
    setCurrentPosition(newPosition); // Actualizar la posición actual
  };

  return (
    <>
      <MapContainer center={initialPosition} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker onPositionChange={handlePositionChange} initialLat={lat} initialLng={lng} />
        </MapContainer>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {/* Mostrar la posición actual */}
        <p className="text-white">Latitud: {currentPosition.lat}, Longitud: {currentPosition.lng}</p>
      </div>
    </>
  );
};

export default DraggableMarkerMap;