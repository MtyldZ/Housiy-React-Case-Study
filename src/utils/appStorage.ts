export class AppStorage {
    static getFavouriteProductIds(): number[] {
        return JSON.parse(localStorage.getItem('@favouriteProducts') || '[]');
    }

    static setFavouriteProductIds(favouriteProductIds: number[]) {
        localStorage.setItem('@favouriteProducts', JSON.stringify(favouriteProductIds));
    }
}
