// import './style.css'
// import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.ts'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
'use strict';
import 'leaflet/dist/leaflet.css';
// @ts-ignore
import L from 'leaflet';
import { htmlElment } from './variables';
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { longitude, latitude } = position.coords;

      const map = L.map(htmlElment.map)
        .locate({ setView: true, maxZoom: 16 })
        .setView([longitude, latitude], 16);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([longitude, latitude]).addTo(map);
    },
    function () {
      alert('Could not get your position...');
    }
  );
}