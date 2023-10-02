import Workout from './Workout';

export default class Cycling extends Workout {
    public speed!: number;
    public constructor(
        public coords: Array<any>,
        public elevation: number,
        public distance: number,
        public duration: number
    ) {
        super(coords, distance, duration);
        this.calculateSpeed();
    }

    /**
     * calculateSpeed
     */
    public calculateSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}
