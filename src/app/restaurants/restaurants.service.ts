import { Restaurant } from "./restaurant/restaurant.model";


export class RestaurantsService {
    constructor(){}

    rests: Restaurant[] = [
        {
          id: "bread-bakery",
          name: "Bread-Bakery",
          category: "Bakery",
          deliveryEstimate: "25m",
          rating: 4.9,
          imagePath: "assets/img/restaurants/breadbakery.png"
    
        }]

    restaurants(): Restaurant[]{
        return this.rests
    }
}