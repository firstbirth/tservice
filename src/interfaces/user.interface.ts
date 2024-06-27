// user.interface.ts

export interface User {
	oid: number;
	login: number;
	hash: string;
	role: string;
	email: string;
	phone: string;
	worker: string;
	workerOid: number;
	userStatus: string;
}