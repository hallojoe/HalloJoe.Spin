module SpinTexter
{
    export class Random
    {
        private seed: number;

        constructor(seed: number = -1)
        {
            if (seed <= 0) 
                seed = Math.floor(Math.random() * 99999) + 11111;
            this.seed = seed;
        }

        private next(min: number = 0, max: number = 0): number
        {
            this.seed = (this.seed * 9301 + 49297) % 233281;    //changed 233280 to 233281 
            var rnd = this.seed / 233281;                       // changed 233280 to 233281 
            return min + rnd * (max - min + 1);
        }

        public nextInt(min: number, max: number): number
        {
            return Math.floor(this.next(min, max));             // changed round to floor
        }

        public nextDouble(): number
        {
            return this.next(0, 1);
        }

        public pick(collection: any[]): any
        {
            return collection[this.nextInt(0, collection.length - 1)];
        }
    }
}