export interface Exercise {
    id: string;
    name:string;
    duration: number;
    calories:number;
    date?: Date; //optional
    state?: 'completed' | 'cancelled' | null;
}