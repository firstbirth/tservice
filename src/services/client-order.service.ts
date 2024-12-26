import { HttpService, API_URL } from "./http.service";
import store from "@/store";
import { renewToken } from "@/services/AuthService";

// import store from "@/store";

export class ClientOrderService {
	static async getClientOrders(
		_userid: number | undefined = undefined,
		_start: number = 0,
		_limit: number = 10,
	) {
		let order_data;

		try {
			const params: { [key: string]: string } = {
				start: _start.toString(),
				limit: _limit.toString(),
				accessId: store.state.token,
			};

			if (_userid !== undefined) {
				params.userId = _userid.toString();
			}

			order_data = await HttpService.post({
				url: `${API_URL}/GetClientOrders/v3/`,
				params,
			});

			if (order_data.data.response === "invalid accessId") {
				await renewToken(store.state.login, store.state.pinCode);
				params.accessId = store.getters["getUserToken"];
				order_data = await HttpService.post({
					url: `${API_URL}/GetClientOrders/v3/`,
					params,
				});
			}
		} catch (error) {
			console.error("Error:", error);
		}

		return order_data?.data;
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
