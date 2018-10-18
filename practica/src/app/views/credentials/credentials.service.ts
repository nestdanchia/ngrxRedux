import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()
export class CredentialsService {
  private url = environment.apiUrl + "pub/credentials/";
  constructor(private http: HttpClient) {}
  // puede que service sea login o registro
  public sendCredential(credential, service: string): Observable<any> {
    // service puede ser login o register
    const credentialsUrl = this.url + service.toLowerCase();
    return this.http.post(credentialsUrl, credential);
  }
}
