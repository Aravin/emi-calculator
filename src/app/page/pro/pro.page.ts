import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-pro',
  templateUrl: './pro.page.html',
  styleUrls: ['./pro.page.scss'],
})
export class ProPage implements OnInit {

  emiForm: FormGroup;
  monthlyEmi = 0;
  totalEMI = 0;
  totalInterest = 0;
  showDetails = false;
  currencyCode = 'INR';
  currencySymbol = '₹';

  // toggle year/month
  tenureType = 'year';
  tenureMultiple = 12;
  tenureMin = 1;
  tenureMax = 30;

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.getSettings();
    });
  }

  ngOnInit() {
    this.emiForm = this.formBuilder.group({
      loanAmount: [1000, [Validators.required, Validators.min(1), Validators.max(999999999)]],
      interest: [8.5, [Validators.required, Validators.min(1), Validators.max(100)]],
      tenure: [ 2, [Validators.required, Validators.min(1), Validators.max(100)]],
      tenureType: [this.tenureType, [Validators.required]],
    });

    this.onChanges();
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

  yearMonthToggle(tenure: string) {
    if (tenure === 'year' && this.tenureType === 'month') {
      this.tenureType = 'year';
      this.tenureMultiple = 12;
      this.tenureMin = 1;
      this.tenureMax = 30;
      this.emiForm.value.tenure = 2;

    } else if (tenure === 'month' && this.tenureType === 'year') {
      this.tenureType = 'month';
      this.tenureMultiple = 1;
      this.tenureMin = 3;
      this.tenureMax = 72;
      this.emiForm.value.tenure = 12;
    }
  }

  onChanges(): void {
    this.emiForm.valueChanges.subscribe(form => {

      const amount = form.loanAmount;
      const interest = form.interest / 12 / 100;
      const tenure = form.tenure * this.tenureMultiple;

      const emi =
        parseFloat((amount * interest * (Math.pow(1 + interest, tenure)) / (Math.pow(1 + interest, tenure) - 1)).toFixed(2));

      this.monthlyEmi = emi;
      this.totalEMI = parseFloat((emi * tenure).toFixed(2));
      this.totalInterest = parseFloat((this.totalEMI - amount).toFixed(2));
    });
  }

}
