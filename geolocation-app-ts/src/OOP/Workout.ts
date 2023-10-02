/**
 * @Workout class
 */

import { v4 as uuid } from 'uuid';
export default class Workout {
    public id = uuid();
    public constructor(
        public coords: Array<any>,
        public distance: number,
        public duration: number
    ) {}
}
