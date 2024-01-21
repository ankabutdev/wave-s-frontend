import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environment/environment";

@Pipe({
    name: 'imageUrl',
    standalone: true
})
export class ImageUrlPipe implements PipeTransform {
    transform(value: string): string {
        var url = "http://localhost:5120"
        return `${url}\\${value}`
    }
}