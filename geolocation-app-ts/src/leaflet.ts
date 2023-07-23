import 'leaflet/dist/leaflet.css';
// @ts-ignore
import L from 'leaflet';
import { leafletTileOptions } from './variables';

export const renderLeafletMap = (
    anchorElement: HTMLDivElement,
    arr: number[]
) => {
    const map = L.map(anchorElement).setView(arr, 13);
    https: L.tileLayer(leafletTileOptions, {
        maxZoom: 19,
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //L.marker(arr).addTo(map).bindPopup(popupMessage).openPopup();

    return map;
};
