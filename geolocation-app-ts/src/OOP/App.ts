// @ts-ignore
import L from 'leaflet';
import { htmlElment, leafletTileOptions } from '../variables';
import Running from './Running';
import Cycling from './Cycling';
const {
    form,
    inputType,
    inputDistance,
    inputDuration,
    inputCadence,
    inputElevation,
} = htmlElment;
const running = new Running([20, 36], 36, 36, 36);
const cycling = new Cycling([20, 30], 100, 145, 45);

console.log('Running: ', running);
console.log('Cycling: ', cycling);

export default class App {
    // Singleton instance of the App class
    private static INSTANCE: App;

    // Leaflet map or layer group
    private map!: L.Map | L.LayerGroup<any>;

    // Event object containing the latitude and longitude of the clicked location on the map
    private mapEvent!: { latlng: { lat: any; lng: any } };

    // Workout array
    private workouts: any[] = [];

    // Constructor method that initializes the App class
    private constructor() {
        console.log('App services has been initialized....');

        // Get the user's current position and load the map
        this.getPosition();

        // Add event listeners for form submission and input type changes
        form.addEventListener('submit', this.newWorkOut.bind(this));
        inputType?.addEventListener('change', this.toggeleElevationFeild);
    }

    // Get the user's current position using the geolocation API
    public getPosition() {
        if (navigator.geolocation)
            navigator.geolocation.getCurrentPosition(
                this.loadMap.bind(this),
                function () {
                    alert('Could not get your position...');
                }
            );
    }

    // Load the Leaflet map using the user's current position
    public loadMap(position: { coords: { longitude: any; latitude: any } }) {
        const { longitude, latitude } = position.coords;

        // Render the Leaflet map and add a click event listener to it
        this.map = this.renderLeafletMap([latitude, longitude]);
        this.map.on('click', event => {
            this.mapEvent = event;
            console.log(this.mapEvent);

            // Show the workout form and focus on the distance input field
            htmlElment.form?.classList.remove('hidden');
            htmlElment?.inputDistance?.focus();
        });
    }

    // Render the Leaflet map with a tile layer and return it
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

    // Create a new workout marker on the map based on user input
    private newWorkOut(e: Event) {
        e.preventDefault();
        const { lat, lng } = this.mapEvent.latlng;
        let workout;

        // Check if the user input is valid
        const validInputs = (...inputs: number[]) =>
            inputs.every(inp => Number.isFinite(inp));

        // check if the numbers are positive
        const allPositive = (...inputs: number[]) =>
            inputs.every(inp => inp > 0);

        // Get the workout data from the form
        const type = inputType!.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;

        // If the workout is running, create a running object
        if (type === 'running') {
            const cadence = +inputCadence.value;

            // Check if the user input is valid
            if (
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            )
                return alert('Inputs have to be positive numbers!');

            // Create a running object
            workout = new Running([lat, lng], distance, duration, cadence);

            // Add the new workout object to the workout array
            this.workouts.push(running);

            console.log(this.workouts);
        }

        // If the workout is cycling, create a cycling object
        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            if (
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration)
            )
                return alert('Inputs have to be positive numbers!');
            workout = new Cycling([lat, lng], distance, duration, elevation);

            this.workouts.push(cycling);
        }

        // Add the new workout object to the workout array

        // Render the workout marker on the map

        // Display the workout marker on the map
        this.renderWorkoutMarker(workout);

        // Clear the input fields
        inputDistance.value =
            inputCadence.value =
            inputDuration.value =
            inputElevation.value =
                '';
    }

    // Toggle the visibility of the elevation input field based on the user's selection
    private toggeleElevationFeild() {
        htmlElment.inputElevation
            .closest('.form__row')
            ?.classList.toggle('form__row--hidden');
        htmlElment.inputCadence
            .closest('.form__row')
            ?.classList.toggle('form__row--hidden');
    }

    public renderWorkoutMarker(workout: {
        coords: Array<any>;
        distance: any;
        type: string;
    }) {
        L.marker(workout.coords as [number, number])
            .addTo(this.map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                })
            )
            .setPopupContent(workout.type)
            .openPopup();
    }

    // Implement the Singleton design pattern to ensure that only one instance of the App class is created
    static instanceOf() {
        if (!App.INSTANCE) {
            App.INSTANCE = new App();
        }

        return App.INSTANCE;
    }
}
