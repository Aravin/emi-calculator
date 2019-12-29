import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage, private router: Router) { }

  // getLocation() {

  //   const promise = this.storage.get('location')
  //     .then((val) => {
  //       return val;
  //     })
  //     .catch((err: any) => {
  //       return err;
  //     });

  //   const location = Promise.resolve(promise);
    
  //   if (!location) {
  //     this.router.navigate(['/settings']);
  //   }

  //   return location;
  // }

  setLocation(location: string): void {
    this.storage.set('location', location);
  }

  getLocation(): Promise<string> {
    return this.storage.get('location');
  }
}
