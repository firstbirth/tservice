import { HttpService, API_URL } from "./http.service";
// import store from "@/store";

export class WorkOrderService {
	static async GetWorkOrders(
		_userId: number = 1,
		_start: number = 0,
		_limit: number = 10
	) {
		let order_data;

		try {
			order_data = await HttpService.post({
				url: `${API_URL}/GetWorkOrders/v4/`,
				params: {
					userId: _userId.toString(),
					start: _start.toString(),
					limit: _limit.toString(),
				},
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return order_data?.data;
	}
	static async GetWorkOrdersByText(
		_userId: number = 1,
		_start: number = 0,
		_limit: number = 10,
		_search_parm: string,
	) {
		let order_data;

		try {
			order_data = await HttpService.post({
				url: `${API_URL}/GetWorkOrders/v4/`,
				params: {
					userId: _userId.toString(),
					start: _start.toString(),
					limit: _limit.toString(),
					search_parm: _search_parm,
				},
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return order_data?.data;
	}
}
