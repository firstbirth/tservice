// src/services/ApiService.ts

import { CapacitorHttp } from "@capacitor/core";

class ApiService {

	// private CORS_PROXY = "https://thingproxy.freeboard.io/fetch/";
	private CORS_PROXY = "https://cors-proxy-uz0z.onrender.com/fetch/";

	private API_URL = "https://svssever.ddns.net";
	private PORT = "8081";
	private PATH = "/AI/hs/MobileTSD";
	private BASE_URL = `${this.API_URL}:${this.PORT}${this.PATH}`;

	// Сменить на true если треубется проксировать CORS запросы
	private USE_PROXY = false;
	
	get_proxied_url = (url: string) => {
		if(this.USE_PROXY) {
			return this.CORS_PROXY + url;
		}
		return url;	
	}

	async getData(
		endpoint: string,
		token: string,
	): Promise<any> {
		try {
			const response = await CapacitorHttp.get({
				url: this.get_proxied_url(this.BASE_URL + endpoint),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async postData(
		endpoint: string,
		parameters: Record<string, any>,
		token: string
	): Promise<any> {
		try {
			const response = await CapacitorHttp.post({
				url: this.get_proxied_url(this.BASE_URL + endpoint),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${token}`,
				},
				data: parameters,
			});

			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async testData(
		endpoint: string,
		token: string
	): Promise<any> {
		try {
			const response = await CapacitorHttp.get({
				url: this.get_proxied_url(this.BASE_URL + endpoint),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Basic ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async testServerConnection(): Promise<any> {
		try {
			const response = await CapacitorHttp.get({
				url: this.get_proxied_url(this.BASE_URL + "/CheckServerStatus/v3/"),
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}

export default new ApiService();
