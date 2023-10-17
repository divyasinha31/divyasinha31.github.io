import { Injectable } from '@angular/core';
import { iCallAPIReq, iCallAPIResp, iGetCommentsResp } from './api-model';
import { API_URL, GET_BINS_ROUTE, MASTER_KEY, REQUEST_TYPE } from './constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(): Observable<iCallAPIResp> {
    const url: string = API_URL.concat(GET_BINS_ROUTE);

    let reqHeaders: HttpHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    reqHeaders = reqHeaders.append("X-Master-Key", MASTER_KEY);

    return this.http.get(url, {headers: reqHeaders}) as Observable<iCallAPIResp>;
  }

  updateComment(payload: iCallAPIReq): Observable<iCallAPIResp> {
    const url: string = API_URL.concat(GET_BINS_ROUTE);

    let reqHeaders: HttpHeaders = new HttpHeaders()
    reqHeaders = reqHeaders.append("Content-Type", "application/json");
    reqHeaders = reqHeaders.append("X-Master-Key", MASTER_KEY);

    return this.http.put(url, payload, {headers: reqHeaders}) as Observable<iCallAPIResp>;
  }
}
