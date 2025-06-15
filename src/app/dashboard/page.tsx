// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DroneCard from "../dashboard/drone-card";

const MapView = dynamic(() => import("../dashboard/map-view"), { ssr: false });

export default function Dashboard() {
  const [drones, setDrones] = useState([]);

  useEffect(() => {
    fetch("/api/v1/drones")
      .then((res) => res.json())
      .then((data) => setDrones(data.data || []));
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">🚁 Drone Mission Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {drones.map((drone: any) => (
          <DroneCard key={drone.id} drone={drone} />
        ))}
      </div>
      <MapView drones={drones} />
    </main>
  );
}
