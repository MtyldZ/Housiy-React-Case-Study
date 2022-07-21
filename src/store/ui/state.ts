export type BasketProductType = {
    [productId: number]: number;
}

export interface UiState {
    isBusy: boolean;
    busyCount: number;
    basketProducts: BasketProductType;
}
