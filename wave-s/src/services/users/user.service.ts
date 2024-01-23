import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserCreate } from "../../interfaces/users";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    /**
     *
     */
    constructor(private http: HttpClient) {

    }

    url = 'http://localhost:5285/users';
    urlServer = "http://185.217.131.163:5024/api/users";

    async createUser(data: UserCreate): Promise<Observable<any>> {
        return await this.http.post(this.urlServer, data);
    }
}