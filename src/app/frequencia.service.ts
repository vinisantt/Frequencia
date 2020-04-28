import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class FrequenciaService {
	constructor(private http: HttpClient) {}
	lista() {
		return this.http.get("assets/turmas.json");
	}
}
