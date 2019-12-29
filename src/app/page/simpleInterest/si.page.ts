import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {}

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

}
