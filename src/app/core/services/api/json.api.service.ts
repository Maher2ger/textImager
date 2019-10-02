import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {NotificationsService} from '../notifications/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {

  constructor(private httpClient: HttpClient, private notification: NotificationsService) {
  }

  //
  // endpoints

  get(url: string) {
    return this.httpClient.get(url).pipe(tap(
      success => success,
      (response: any) => {
        this.notification.generateException(response);
      }
    ));
  }

  text(url: string) {
    return this.httpClient.get(url, { responseType: 'text' }).pipe(tap(
      success => success,
      (response: any) => {
        this.notification.generateException(response);
      }
    ));
  }

  post(url: string, body: any) {
    return this.httpClient.post(url, body).pipe(tap(
      success => success,
      (response: any) => {
        this.notification.generateException(response);
      }
    ));
  }

  postFiles(url: string, body: any) {
    return this.httpClient.post(url, body, {headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })}).pipe(tap(
      success => success,
      (response: any) => {
        this.notification.generateException(response);
      }
    ));
  }

  put(url: string, body: any) {
    return this.httpClient.put(url, body).pipe(tap(
      success => success,
      (response: any) => {
        this.notification.generateException(response);
      }
    ));
  }

  delete(url: string) {
    return this.httpClient.delete(url).pipe(tap(
      success => success,
      (response) => {
        this.notification.generateException(response);
      }
    ));
  }
}
