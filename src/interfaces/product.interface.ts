// product.interface.ts

export interface Product {
	productOid: number;
	productName: string;
	scanCode: string;
	vendorCode: string;
	restTotal: string;
	restByWarehouse: any[]; // Можно уточнить тип, если известна структура элементов массива
	storagePlaces: any[]; // Можно уточнить тип, если известна структура элементов массива
	price: number;
	productAnalogues: string[];
}