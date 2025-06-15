// src/app/dashboard/drone-card.tsx

import React from "react";

type DroneProps = {
  drone: {
    id: string;
    name: string;
    status: "AVAILABLE" | "IN_MISSION" | "OFFLINE";
    location: {
      coordinates: [number, number];
    };
    lastSeenAt: string;
  };
};

const statusColorMap = {
  AVAILABLE: "text-green-600",
  IN_MISSION: "text-yellow-500",
  OFFLINE: "text-red-500",
};

export default function DroneCard({ drone }: DroneProps) {
  return (
    <div className="border p-4 rounded-xl shadow-md bg-white space-y-2">
      <h2 className="text-xl font-semibold">🚁 {drone.name}</h2>
      <p className={statusColorMap[drone.status]}>
        <strong>Status:</strong> {drone.status.replace("_", " ")}
      </p>
      <p>
        <strong>Location:</strong> {drone.location.coordinates[1].toFixed(4)},{" "}
        {drone.location.coordinates[0].toFixed(4)}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Last Seen:</strong>{" "}
        {new Date(drone.lastSeenAt).toLocaleString()}
      </p>
    </div>
  );
}
