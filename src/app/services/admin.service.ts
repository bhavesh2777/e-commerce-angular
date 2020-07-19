import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  token = `Bearer ` + JSON.parse(localStorage.getItem('token'))

  constructor(private http: HttpClient) { }

  url = `http://localhost:3000/admin`;

  getProducts() {
    return this.http.get(this.url + `/products`, { headers: { 'Authorization': this.token } });
  }

  postAddProduct(title, price, description) {
    return this.http.post(this.url + `/add-product`,
      { title: title, price: price, description: description },
      { headers: { 'Authorization': this.token } }
    )

  }

  postEditProduct(productId, title, price, description) {
    return this.http.post(this.url + `/edit-product`,
      { title: title, price: price, description: description, productId: productId },
      { headers: { 'Authorization': this.token } }
    )

  }

  deleteProduct(productId) {
    return this.http.post(this.url + `/delete-product`,
      { productId: productId },
      { headers: { 'Authorization': this.token } }
    )

  }


}
