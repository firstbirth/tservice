// http.interface.ts

export interface RequestOptions {
	url: string;
	headers?: { [key: string]: string };
	params?: { [key: string]: string };
	data?: any;
}