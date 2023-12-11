import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import md5 from 'md5';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  private publicKey = 'f41edb5fb10e262d805bc92da73de818';
  private privateKey = 'e646ef342d589d7d37782892a498469ca817e6fc';
  private baseUrl = 'http://gateway.marvel.com/v1/public/comics?';

  constructor(private http: HttpClient) {}

  getComics(): Observable<any[]> {
    const timestamp = new Date().getTime().toString();
    const hash = md5(timestamp + this.privateKey + this.publicKey);

    const apiUrl = `${this.baseUrl}ts=${timestamp}&apikey=${this.publicKey}&hash=${hash}&limit=100`;

    return this.http.get<any[]>(apiUrl);
  }
}
