export class DataResource<T> {
	constructor(
		private endpoint: string,
		private updateField: string
	) {}

	async loadAll(): Promise<T[]> {
		const res = await fetch(this.endpoint)

		return res.json()
	}
	async loadOne(get_query: string): Promise<T[]> {

		const res = await fetch(`${this.endpoint}/${get_query}`)

		return res.json()
	}
	// async delete(id: number): Promise<Response> {
	// 	const res = await fetch(`${this.endpoint}/${id}`, {
	// 		method: 'DELETE',
	// 	})

	// 	return res
	// }
	async create(data: T): Promise<Response> {
		const res = await fetch(this.endpoint, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		})

		return res
	}

	async update(data: T): Promise<Response> {
		const res = await fetch(this.endpoint, {
			method: 'PUT',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		})

		return res
	}

	async createOrUpdate(data: T, get_query: string): Promise<Response> {
		//Check if the item already exists
		//If Yes then updates
		//Else creates
		const get_res = this.loadOne(get_query);
		let existed = false;
		let old_val = null;
		get_res.then((res) => {
			if (res.length) {
				existed = true;
				old_val = res[0][this.updateField];
			};
		})
		.catch((error) => {
			console.log(error);
		});
		if (existed) {
			data[this.updateField] += old_val;
			return this.update(data); 
		} else {
			return this.create(data);
		}
	}
}
