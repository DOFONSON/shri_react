import { Movie } from "./Movie";
import { Actor } from "./Actors";

export interface SingleMovie extends Movie {
    actors: Actor[],
    total_rates_count: string
}