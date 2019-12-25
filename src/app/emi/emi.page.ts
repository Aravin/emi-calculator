import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface EmiSchedule {
  startingBalance: number;
  principal: number;
  interest: number;
  emi: string;
  endingBalance: string;
  percentagePaid: string;
}

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

  emiSchedule: EmiSchedule[] = [];

  constructor(private formBuilder: FormBuilder) {}

  displayedColumns: string[] = ['principal', 'interest', 'emi', 'endingBalance', 'percentagePaid'];

  ngOnInit() {
    this.emiForm = this.formBuilder.group({
      loanAmount: ['10000', [Validators.required, Validators.min(1), Validators.max(999999999)]],
      interest: ['10', [Validators.required, Validators.min(1), Validators.max(100)]],
      tenure: ['1', [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  calculateEmi() {

    if (!this.emiForm.value.loanAmount
      || !this.emiForm.value.interest
      || !this.emiForm.value.tenure) {
      return;
    }

    this.emiSchedule = [];

    const P: number = this.emiForm.value.loanAmount;
    let p = P;
    const r: number = this.emiForm.value.interest;
    const yr: number = r / 12 / 100;
    const n: number = this.emiForm.value.tenure;
    const yn: number = n * 12;

    this.emi = parseFloat((p * yr * (Math.pow(1 + yr, yn)) /  (Math.pow(1 + yr, yn) - 1)).toFixed(2));

    // for month wise calcualtion
    for ( let i = yn ; i >= 1; i --) {

      const ci = parseFloat( ((p * r) / (100 * 12)).toFixed(2) );
      let cp = this.emi - parseFloat( ( (p * r) / (100 * 12) ).toFixed(2) );
      cp = parseFloat(cp.toFixed(2));
      const pp = ((cp / 100 - p / 100) + 100).toFixed(2);

      const monthlyEmi: EmiSchedule = {
        startingBalance: p,
        principal: cp,
        interest: ci,
        emi: (ci + cp).toFixed(2),
        endingBalance: (p - cp).toFixed(2),
        percentagePaid: pp,
      };

      this.emiSchedule.push(monthlyEmi);

      p = parseFloat((p - cp).toFixed(2));
    }

    this.totalEmi = parseFloat((this.emi * yn).toFixed(2));

    this.totalInterest = parseFloat((this.totalEmi - p).toFixed(2));
  }

}
