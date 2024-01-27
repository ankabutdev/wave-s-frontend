import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environment/environment.prod";

@Pipe({
    name: 'imageUrl',
    standalone: true
})
export class ImageUrlPipe implements PipeTransform {
    transform(value: string): string {
        return `${environment.apiUrl}\\${value}`
    }
}