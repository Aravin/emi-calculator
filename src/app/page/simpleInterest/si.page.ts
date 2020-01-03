import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'si.page.html',
  styleUrls: ['si.page.scss']
})

export class Tab2Page implements OnInit {

  emiForm: FormGroup;
  emi = 0;
  totalEmi = 0;
  totalInterest = 0;
  showDetails = false;
  currencyCode = 'INR';
  currencySymbol = '₹';

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private platform: Platform) {
    this.platform.ready().then(() => {
      this.getSettings();
    });
  }

  ngOnInit() {
    this.emiForm = this.formBuilder.group({
      loanAmount: ['', [Validators.required, Validators.min(1), Validators.max(999999999)]],
      interest: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
  }

  calculateEmi() {

    if (!this.emiForm.value.loanAmount || !this.emiForm.value.interest) {
      return;
    }


    const P: number = this.emiForm.value.loanAmount;
    const r: number = this.emiForm.value.interest;

    this.totalInterest = parseFloat((P * r / 100).toFixed(2));

    this.showDetails = true;
  }

  getSettings() {
    this.storageService.getLocation().code.then(val => {
      if (val) {
        this.currencyCode = val;
      }
    });
    this.storageService.getLocation().symbol.then(val => {
      if (val) {
        this.currencySymbol = val;
      }
    });
  }

}
