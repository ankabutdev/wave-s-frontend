import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RouterService {

    private messageSource = new BehaviorSubject('Original message.');

    currentMessage = this.messageSource.asObservable();

    async changeMessage(message: string) {
        await this.messageSource.next(message)
    }
}