// @ts-ignore
import L from 'leaflet';
import { htmlElment, leafletTileOptions } from '../variables';

export default class App {
    private static INSTANCE: App;
    private map!: L.Map | L.LayerGroup<any>;
    private mapEvent!: { latlng: { lat: any; lng: any } };
    private constructor() {
        console.log('App services has been initialized....');

        /**
         * @getPosition method will be called soon as the class is initialized
         */
        this.getPosition();

        htmlElment.form.addEventListener('submit', this.newWorkOut.bind(this));

        htmlElment.inputType?.addEventListener(
            'change',
            this.toggeleElevationFeild
        );
    }

    public getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                this.loadMap.bind(this),
                function () {
                    alert('Could not get your position...');
                }
            );
    }

    public loadMap(position: { coords: { longitude: any; latitude: any } }) {
        const { longitude, latitude } = position.coords;

        this.map = this.renderLeafletMap([latitude, longitude]);

        this.map.on('click', event => {
            this.mapEvent = event;
            console.log(this.mapEvent);

            htmlElment.form?.classList.remove('hidden');
            htmlElment?.inputDistance?.focus();
        });
    }

    protected renderLeafletMap(
        latlngArr: L.LatLngLiteral | L.LatLngTuple
    ): L.Map | L.LayerGroup<any> {
        this.map = L.map(htmlElment.map).setView(latlngArr, 13);
        L.tileLayer(leafletTileOptions, {
            maxZoom: 19,
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        //L.marker(arr).addTo(map).bindPopup(popupMessage).openPopup();

        return this.map;
    }

    private newWorkOut(e: Event) {
        e.preventDefault();
        const { lat, lng } = this.mapEvent.latlng;

        const { inputDistance, inputCadence, inputDuration, inputElevation } =
            htmlElment;

        inputDistance.value =
            inputCadence.value =
            inputDuration.value =
            inputElevation.value =
                '';

        L.marker([lat, lng])
            .addTo(this.map)
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
    }

    private toggeleElevationFeild() {
        htmlElment.inputElevation
            .closest('.form__row')
            ?.classList.toggle('form__row--hidden');
        htmlElment.inputCadence
            .closest('.form__row')
            ?.classList.toggle('form__row--hidden');
    }

    /**
     * @Singleton an OOP design pattern where we initialize instance on class only once to reduce the cost of the memory.
     * this can be done via static method, and cannot be called its instance straight
     */
    static instanceOf() {
        if (!App.INSTANCE) {
            App.INSTANCE = new App();
        }

        return App.INSTANCE;
    }
}
