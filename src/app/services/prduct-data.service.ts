import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  // تأكد من أن هذا المسار صحيح ويتطابق مع واجهة الـ API
  private apiUrl = 'https://auto-gear.vercel.app/admin/spare-parts'; 

  constructor(private http: HttpClient) {}

  // الحصول على التوكن من sessionStorage وإضافته إلى headers
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('authToken'); // الحصول على التوكن من sessionStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // تأكد من نوع المحتوى
    });
  }

  // إضافة منتج جديد
  addProduct(productData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, productData, { headers: this.getAuthHeaders() });
  }

  // الحصول على منتج باستخدام ID
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  // تحديث منتج موجود
  updateProduct(id: string, productData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, productData, { headers: this.getAuthHeaders() });
  }

  // حذف منتج
  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
