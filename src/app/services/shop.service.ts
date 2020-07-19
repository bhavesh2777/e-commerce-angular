import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  token = `Bearer ` + JSON.parse(localStorage.getItem('token'))

  constructor(private http: HttpClient) { }

  url = `http://localhost:3000`;

  getProducts() {
    return this.http.get(this.url + '/products')
  }

  getProduct(productId) {
    let params = new HttpParams;

    if (productId != null) {
      params = params.set('productId', productId);
    }

    return this.http.get(this.url + `/products`, { params: params });
  }

  getCart() {
    return this.http.get(this.url + `/cart`, { headers: { 'Authorization': this.token } });
  }

  postCart(productId) {
    return this.http.post(this.url + `/cart`, { productId: productId }, { headers: { 'Authorization': this.token } })
  }

  postCartDeleteProduct(productId) {
    return this.http.post(this.url + `/cart-delete-item`, { productId: productId }, { headers: { 'Authorization': this.token } })
  }

  getOrders() {
    return this.http.get(this.url + `/orders`, { headers: { 'Authorization': this.token } });
  }

  getInvoice(orderId) {
    let params = new HttpParams;

    if (orderId != null) {
      params = params.set('productId', orderId);
    }

    return this.http.get(this.url + `/products`, { headers: { 'Authorization': this.token }, params: params });
  }


}
