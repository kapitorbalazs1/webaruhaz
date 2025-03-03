import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothingService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  /**
   * Lekéri az adott kategóriájú ruházati termékeket.
   * @param kategoria A ruházati kategória neve.
   * @returns Observable az API válaszával.
   */
  termekeketLeker(kategoria: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/ruhak`);
  }
}
