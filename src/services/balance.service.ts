import { HttpService, API_URL } from "./http.service";
import store from "@/store";
import { renewToken } from "@/services/AuthService";

// import store from "@/store";

export class BalanceService {
	static async getUserSalary(
		_userid: number
	) {
		let salary_data;

		try {
			const params: { [key: string]: string } = {
				userId: _userid.toString(),
			};

			salary_data = await HttpService.post({
				url: `${API_URL}/GetUserSalary/v3/`,
				params,
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return salary_data?.data;
	}
	static async getWorkOrdersTotal(
		_userid: number
	) {
		let workOrderTotal_data;

		try {
			const params: { [key: string]: string } = {
				userId: _userid.toString(),
			};

			workOrderTotal_data = await HttpService.post({
				url: `${API_URL}/GetWorkOrdersTotal/v3/`,
				params,
			});
		} catch (error) {
			console.error("Error:", error);
		}

		return workOrderTotal_data?.data;
	}

	static async getClientOrderByOID(
		_userid: number = 1,
		_clientOrderOID: string,
	) {
		let order_data;

		try {
			order_data = await HttpService.post({
				url: `${API_URL}/GetClientOrderByOID/v3/`,
				params: {
					userId: _userid.toString(),
					clientOrderOid: _clientOrderOID,
					accessId: store.state.token,
				},
			});

			if (order_data.data.response === "invalid accessId") {
				await renewToken(store.state.login, store.state.pinCode);
				order_data = await HttpService.post({
					url: `${API_URL}/GetClientOrderByOID/v3/`,
					params: {
						userId: _userid.toString(),
						clientOrderOid: _clientOrderOID,
						accessId: store.state.token,
					},
				});
			}

		} catch (error) {
			console.error("Error:", error);
		}

		return order_data?.data;
	}

	static async getClientOrderProductsByOID(
		_userid: number = 1,
		_clientOrderOID: string,
	) {
		let order_data;

		try {
			order_data = await HttpService.post({
				url: `${API_URL}/GetClientOrderProductsByOID/v3/`,
				params: {
					userId: _userid.toString(),
					clientOrderOid: _clientOrderOID,
					accessId: store.state.token,
				},
			});

			if (order_data.data.response === "invalid accessId") {
				await renewToken(store.state.login, store.state.pinCode);
				order_data = await HttpService.post({
					url: `${API_URL}/GetClientOrderProductsByOID/v3/`,
					params: {
						userId: _userid.toString(),
						clientOrderOid: _clientOrderOID,
						accessId: store.state.token,
					},
				});
			}
		} catch (error) {
			console.error("Error:", error);
		}

		return order_data?.data;
	}

}
