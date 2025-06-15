// "use client";

// import React from "react";
// import Map, { Marker } from "react-map-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
// // import { DroneStatus } from "@prisma/client"; // optional if you're using enums from backend

// type Drone = {
//   id: string;
//   name: string;
//   status: "AVAILABLE" | "IN_MISSION";
//   location: {
//     coordinates: [number, number]; // [lng, lat]
//   };
// };

// const MapView = ({ drones }: { drones: Drone[] }) => {
//   const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

//   if (!MAPBOX_TOKEN) {
//     return (
//       <p className="text-red-500">
//         ⚠️ Mapbox token missing. Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local
//       </p>
//     );
//   }

//   const center = drones.length
//     ? {
//         longitude: drones[0].location.coordinates[0],
//         latitude: drones[0].location.coordinates[1],
//       }
//     : { longitude: 77.5946, latitude: 12.9716 }; // default to Bangalore

//   return (
//     <div className="rounded-xl overflow-hidden border shadow-md">
//       <Map
//         mapboxAccessToken={MAPBOX_TOKEN}
//         initialViewState={{
//           ...center,
//           zoom: 6,
//         }}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         style={{ width: "100%", height: "500px" }}
//       >
//         {drones.map((drone) => (
//           <Marker
//             key={drone.id}
//             longitude={drone.location.coordinates[0]}
//             latitude={drone.location.coordinates[1]}
//             anchor="bottom"
//             color={
//               drone.status === "AVAILABLE"
//                 ? "green"
//                 : drone.status === "IN_MISSION"
//                 ? "blue"
//                 : "gray"
//             }
//           />
//         ))}
//       </Map>
//     </div>
//   );
// };

// export default MapView;

/////////////////////////////////////////

// import React from "react";
// import Map, { Marker } from "react-map-gl";

// type Drone = {
//   id: string;
//   name: string;
//   status: string;
//   location: {
//     coordinates: [number, number]; // [lng, lat]
//   };
// };

// const MapView = ({ drones }: { drones: Drone[] }) => {
//   const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

//   if (!MAPBOX_TOKEN) {
//     return (
//       <p className="text-red-500">
//         ⚠️ Mapbox token missing. Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local
//       </p>
//     );
//   }

//   const center = drones.length
//     ? {
//         longitude: drones[0].location.coordinates[0],
//         latitude: drones[0].location.coordinates[1],
//       }
//     : { longitude: 77.5946, latitude: 12.9716 };

//   const getColor = (status: string) => {
//     switch (status) {
//       case "AVAILABLE":
//         return "bg-green-500";
//       case "IN_MISSION":
//         return "bg-blue-500";
//       case "OFFLINE":
//         return "bg-gray-400";
//       default:
//         return "bg-black";
//     }
//   };

//   return (
//     <div className="rounded-xl overflow-hidden border shadow-md">
//       <Map
//         mapboxApiAccessToken={MAPBOX_TOKEN}
//         initialViewState={{ ...center, zoom: 6 }}
//         mapStyle="mapbox://styles/mapbox/streets-v11"
//         style={{ width: "100%", height: "500px" }}
//       >
//         {drones.map((drone) => (
//           <Marker
//             key={drone.id}
//             longitude={drone.location.coordinates[0]}
//             latitude={drone.location.coordinates[1]}
//           >
//             <div
//               className={`w-4 h-4 rounded-full ${getColor(
//                 drone.status
//               )} border-2 border-white shadow-md`}
//               title={drone.name}
//             />
//           </Marker>
//         ))}
//       </Map>
//     </div>
//   );
// };

// export default MapView;

///////////////////////////////////////////
"use client";

import React from "react";
import Map, { Marker } from "react-map-gl";

type Drone = {
  id: string;
  name: string;
  status: string;
  location: {
    coordinates: [number, number]; // [lng, lat]
  };
};

const MapView = ({ drones }: { drones: Drone[] }) => {
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  if (!MAPBOX_TOKEN) {
    return (
      <p className="text-red-500">
        ⚠️ Mapbox token missing. Set NEXT_PUBLIC_MAPBOX_TOKEN in .env.local
      </p>
    );
  }

  const center = drones.length
    ? {
        longitude: drones[0].location.coordinates[0],
        latitude: drones[0].location.coordinates[1],
        zoom: 6,
      }
    : { longitude: 77.5946, latitude: 12.9716, zoom: 6 };

  return (
    <div className="rounded-xl overflow-hidden border shadow-md">
      <Map
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={center}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: "100%", height: "500px" }}
      >
        {drones.map((drone) => (
          <Marker
            key={drone.id}
            longitude={drone.location.coordinates[0]}
            latitude={drone.location.coordinates[1]}
          >
            <div
              className={`w-4 h-4 rounded-full ${
                drone.status === "AVAILABLE"
                  ? "bg-green-500"
                  : drone.status === "IN_MISSION"
                  ? "bg-blue-500"
                  : "bg-gray-400"
              } border-2 border-white shadow-md`}
              title={drone.name}
            />
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default MapView;
