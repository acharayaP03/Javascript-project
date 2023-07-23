'use strict';
import 'leaflet/dist/leaflet.css';
// @ts-ignore
import L from 'leaflet';
import { htmlElment } from './variables';
import { renderLeafletMap } from './leaflet';
let mapEvent: { latlng: { lat: any; lng: any } },
    map: L.Map | L.LayerGroup<any>;
if (navigator.geolocation)
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const { longitude, latitude } = position.coords;

            map = renderLeafletMap(htmlElment.map, [latitude, longitude]);

            map.on('click', function (event: any) {
                mapEvent = event;
                htmlElment.form?.classList.remove('hidden');
                htmlElment?.inputDistance?.focus();
            });
        },
        function () {
            alert('Could not get your position...');
        }
    );

htmlElment.form?.addEventListener('submit', function (e: Event) {
    e.preventDefault();
    const { lat, lng } = mapEvent.latlng;

    const { inputDistance, inputCadence, inputDuration, inputElevation } =
        htmlElment;

    inputDistance.value =
        inputCadence.value =
        inputDuration.value =
        inputElevation.value =
            '';

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: 'running-popup',
            })
        )
        .setPopupContent('Working out...')
        .openPopup();
});

htmlElment.inputType?.addEventListener('change', function () {
    htmlElment.inputElevation
        .closest('.form__row')
        ?.classList.toggle('form__row--hidden');
    htmlElment.inputCadence
        .closest('.form__row')
        ?.classList.toggle('form__row--hidden');
});
