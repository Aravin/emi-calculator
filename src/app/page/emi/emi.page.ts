import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Platform } from '@ionic/angular';
import { ChartType, ChartColor, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { EmiSchedule } from './EmiSchedule';

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
  showDetails = false;
  currencyCode = 'INR';
  currencySymbol = '₹';

  // year / month
  tenure = 'Years';
  tenureChecked = false;
  // monthToYear = 12;

  emiSchedule: EmiSchedule[] = [];

  // charts
  // Doughnut
  doughnutChartLabels: Label[] = ['Principal', 'Interest'];
  doughnutChartType: ChartType = 'doughnut';
  doughnutColors: ChartColor[] = [ ['#10dc60'], ['#f04141'] ];
  chartData: ChartDataSets[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.getSettings();
    });
  }

  displayedColumns: string[] = ['sno', 'principal', 'interest', 'endingBalance', 'percentagePaid'];

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

    this.emiSchedule = [];
    this.chartData = [];

    const P: number = this.emiForm.value.loanAmount;
    let p = P;
    const r: number = this.emiForm.value.interest;
    const yr: number = r / 12 / 100;
    const n: number = this.emiForm.value.tenure;
    const yn: number = n * 12;

    let pp = 0;
    let tpp = 0;

    this.emi = parseFloat((p * yr * (Math.pow(1 + yr, yn)) / (Math.pow(1 + yr, yn) - 1)).toFixed(2));

    // for month wise calculation
    for (let i = yn; i >= 1; i--) {

      const ci = (p * r) / (100 * 12);
      const fci = parseFloat(ci.toFixed(2));
      const cp = this.emi - ((p * r) / (100 * 12));
      const fcp = parseFloat(cp.toFixed(2));

      pp = (cp * 100 / P);
      tpp = parseFloat((tpp + pp).toFixed(2));

      const monthlyEmi: EmiSchedule = {
        startingBalance: p,
        principal: fcp,
        interest: fci,
        emi: (fci + fcp).toFixed(2),
        endingBalance: (p - cp).toFixed(2),
        percentagePaid: tpp,
      };

      this.emiSchedule.push(monthlyEmi);

      p = parseFloat((p - cp).toFixed(2));
    }

    this.totalEmi = parseFloat((this.emi * yn).toFixed(2));
    this.totalInterest = parseFloat((this.totalEmi - P).toFixed(2));


    this.chartData.push(
      { data: [P, this.totalInterest], backgroundColor: ['#28e070', '#f25454'], hoverBackgroundColor:  ['#10dc60', '#f04141']},
    );

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

  toggleTenure() {
    if (this.tenureChecked) {
      this.tenureChecked = false;
      this.tenure = 'Years';
      // this.monthToYear = 12;
    } else {
      this.tenureChecked = true;
      this.tenure = 'Months';
      // this.monthToYear = 1;
    }
  }

}
