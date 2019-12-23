import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'emi.page.html',
  styleUrls: ['emi.page.scss']
})
export class EmiPage implements OnInit {

  emiForm: FormGroup;
  emi = 0;
  totalEmi = 0;
  totalInterest = 0;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.emiForm = this.formBuilder.group({
      loanAmount: ['', [Validators.required, Validators.min(1), Validators.max(999999999)]],
      interest: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      tenure: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  calculateEmi() {

    if (!this.emiForm.value.loanAmount
      || !this.emiForm.value.interest
      || !this.emiForm.value.tenure) {
      return;
    }
    const P = this.emiForm.value.loanAmount;
    const r = this.emiForm.value.interest / 12 / 100;
    const n = this.emiForm.value.tenure * 12;

    this.emi = parseFloat((P * r * (Math.pow(1 + r, n)) /  (Math.pow(1 + r, n) - 1)).toFixed(2));

    this.totalEmi = parseFloat((this.emi * n).toFixed(2));

    this.totalInterest = parseFloat((this.totalEmi - P).toFixed(2));

  }

}
