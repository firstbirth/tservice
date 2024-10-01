export interface WorkOrder {
	workOrderId: number;
	number: string;
	date: number;
	organisation: string;
	client: string;
	comment: string;
	totalSum: string;
	status: string;
	fulfillment: number;
	auto: string;
	automobileNotes: string;
	clientNotes: string;
	faultByClient: string;
	faultByInspection: string;
	specialNotes: string;
	recommendations: string;
	author: string;
	authorId: number;
	engineer: string;
	engineerId: number;
	master: string;
	masterId: number;
}
