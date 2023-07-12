/** @format */

import axios from 'axios';

export class HttpService {
	async post(url: string, data: isTypeObject): Promise<any> {
		return axios.post(url, data);
	}
	async get(url: string): Promise<any> {
		return axios.get(url);
	}
}
