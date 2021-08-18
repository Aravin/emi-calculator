import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private router: Router) { }

  setCurrency(location: any): void {
    this.storage.set('symbol', location.symbol_native);
    this.storage.set('code', location.code);
  }

  getLocation() {
    return {
      code: this.storage.get('code'),
      symbol: this.storage.get('symbol')
    };
  }
}
