export interface ClientOrder {
	clientOrderId: number;
	date: number;
	number: string;
	client: string;
	comment: string;
	totalSum: string;
	fulfillment: number;
	author: string;
	authorId: number;
}
