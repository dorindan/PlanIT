import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {GoogleObj} from "../model/GoogleObj";

@Injectable({
  providedIn: 'root'
})
export class GoogletranslateService {
  url = 'https://translation.googleapis.com/language/translate/v2?key=';

  key = 'AIzaSyDX1-y1FHEPz-mhgLFLtVLOHh5XoQC4WsA';

  constructor(private http: HttpClient) {
  }

  translate(obj: GoogleObj) {
    return this.http.post(this.url + this.key, obj);
  }
}
