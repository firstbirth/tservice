import { HttpService, API_URL } from "./http.service";
// import store from "@/store";

export class ClientOrderService {
	static async getClientOrders(
		_userid: number = 1,
		_start: number = 0,
		_limit: number = 10
	) {
		let order_data;

		try {
			order_data = await HttpService.post({
				url: `${API_URL}/GetClientOrders/v3/`,
				params: {
					userId: _userid.toString(),
					start: _start.toString(),
					limit: _limit.toString(),
				},
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return order_data?.data;
	}
}
