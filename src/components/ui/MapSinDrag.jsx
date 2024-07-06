"use client";
import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "@/components/ui/Map.css";

const MapDisplay = ({ lat, lng }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <MapContainer center={{ lat, lng }} zoom={13} scrollWheelZoom={false} className="w-full h-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
};

export default MapDisplay;