// prettier-ignore
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const htmlElment = {
    map: document.querySelector('#map') as HTMLDivElement,
    form: document.querySelector('.form') as HTMLFormElement,
    containerWorkouts: document.querySelector('.workouts'),
    inputType: document.querySelector('.form__input--type'),
    inputDistance: document.querySelector(
        '.form__input--distance'
    ) as HTMLInputElement,
    inputDuration: document.querySelector(
        '.form__input--duration'
    ) as HTMLInputElement,
    inputCadence: document.querySelector(
        '.form__input--cadence'
    ) as HTMLInputElement,
    inputElevation: document.querySelector(
        '.form__input--elevation'
    ) as HTMLInputElement,
};

/**
 * For more openstreetmap tile option please visit, below site.
 * https://leaflet-extras.github.io/leaflet-providers/preview/
 */
export const leafletTileOptions: string =
    'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
