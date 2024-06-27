import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import { RequestOptions } from "@/interfaces/http.interface";

const URL = "https://svssever.ddns.net";
const PORT = "8081";
const PATH = "/AI/hs/MobileTSD";

export const API_URL = `${URL}:${PORT}${PATH}`;

export class HttpService {
	static async get(options: RequestOptions): Promise<HttpResponse> {
		return CapacitorHttp.get(options);
	}

	static async post(options: RequestOptions): Promise<HttpResponse> {
		return CapacitorHttp.post(options);
	}

	static async put(options: RequestOptions): Promise<HttpResponse> {
		return CapacitorHttp.put(options);
	}

	static async request(options: RequestOptions): Promise<HttpResponse> {
		return CapacitorHttp.request(options);
	}
}

/* usage */

/*

import { HttpService } from "./HttpService";

const doGet = async () => {
	const options = {
		url: "https://example.com/my/api",
		headers: { "X-Fake-Header": "Fake-Value" },
		params: { size: "XL" },
	};

	try {
		const response = await HttpService.get(options);
		console.log(response.data);
	} catch (error) {
		console.error("Error:", error);
	}
};

const doPost = async () => {
	const options = {
		url: "https://example.com/my/api",
		headers: { "X-Fake-Header": "Fake-Value" },
		data: { foo: "bar" },
	};

	try {
		const response = await HttpService.post(options);
		console.log(response.data);
	} catch (error) {
		console.error("Error:", error);
	}
};

*/
