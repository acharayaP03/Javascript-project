import Workout from './Workout';

export default class Running extends Workout {
    public pace!: number;
    public type: string = 'running';
    public constructor(
        public coords: Array<any>,
        public cadence: number,
        public distance: number,
        public duration: number
    ) {
        super(coords, distance, duration);

        this.calculatePace();
    }

    /**
     * calculatePace
     */
    public calculatePace() {
        this.pace = this.duration / this.duration;
        return this.pace;
    }
}
