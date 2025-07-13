import { BasketModel } from "./basket.model";

export interface OrderModel {
    id?: string;
    userId: string;
    orderNumber: string;
    date: Date;
    fullName: string;
    phoneNumber: string;
    city: string;
    district: string;
    fullAdress: string;
    cardNumber: string;
    cardOwnerName: string;
    expiresDate: string;
    cvv: number;
    installmentOption: string;
    status: string;
    baskets: BasketModel[];
}
export const initialOrder: OrderModel = {
    userId : "",
    orderNumber : "",
    date : new Date(),
    fullName : "",
    phoneNumber : "",
    city : "",
    district : "",
    fullAdress : "",
    cardNumber : "",
    cardOwnerName : "",
    expiresDate : "",
    cvv : 0,
    installmentOption : "Tek Çekim",
    status : "Sipariş Hazırlanıyor",
    baskets : []
}