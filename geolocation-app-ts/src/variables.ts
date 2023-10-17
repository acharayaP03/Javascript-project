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

enum DomElements {
    MAP = '#map',
    FORM = '.form',
    CONTAINERWORKOUT = '.workouts',
    INPUTTYPE = '.form__input--type',
    INPUTDISTANCE = '.form__input--distance',
    INPUTDURATION = '.form__input--duration',
    INPUTCADENCE = '.form__input--cadence',
    INPUTELEVATION = '.form__input--elevation',
}

export const htmlElment = {
    map: document.querySelector(DomElements.MAP) as HTMLDivElement,
    form: document.querySelector(DomElements.FORM) as HTMLFormElement,
    containerWorkouts: document.querySelector(DomElements.CONTAINERWORKOUT),
    inputType: document.querySelector(
        DomElements.INPUTTYPE
    ) as HTMLInputElement,
    inputDistance: document.querySelector(
        DomElements.INPUTDISTANCE
    ) as HTMLInputElement,
    inputDuration: document.querySelector(
        DomElements.INPUTDURATION
    ) as HTMLInputElement,
    inputCadence: document.querySelector(
        DomElements.INPUTCADENCE
    ) as HTMLInputElement,
    inputElevation: document.querySelector(
        DomElements.INPUTELEVATION
    ) as HTMLInputElement,
};

/**
 * For more openstreetmap tile option please visit, below site.
 * https://leaflet-extras.github.io/leaflet-providers/preview/
 */
export const leafletTileOptions: string =
    'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png';
