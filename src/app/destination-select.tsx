'use client';

import { useState } from "react";
import { mqttService } from "./mqtt";

class Destination {
    name: string;
    lat: number;
    lng: number;

    constructor(name: string, lat: number, lng: number) {
        this.name = name;
        this.lat = lat;
        this.lng = lng;
    }
}
const destinations: Destination[] = [
    new Destination("Location1", 37.437041393899676, -4.191635586788259),
    new Destination("Location2", 37.437041393899676, -4.191635586788259),
    new Destination("Location3", 37.437041393899676, -4.191635586788259),
    new Destination("Location4", 37.437041393899676, -4.191635586788259),
    new Destination("Location5", 37.437041393899676, -4.191635586788259),
];

export default function DestinationSelect() {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <div className="w-64 bg-gray-100 p-4 border-r">
            <h2 className="text-lg font-semibold mb-4">Locations</h2>
            <div className="flex flex-col space-y-2">
                {destinations.map((dest) => (
                    <button
                        key={dest.name}
                        onClick={() => {setSelected(dest.name)
                            mqttService.publish('destination', JSON.stringify({ lat: dest.lat, lng: dest.lng }));
                        }}
                        className={`px-4 py-2 text-left rounded-lg transition-colors ${selected === dest.name
                                ? "bg-blue-500 text-white"
                                : "bg-white hover:bg-gray-200"
                            }`}
                    >
                        {dest.name}
                    </button>
                ))}
            </div>
        </div>

    );
}
