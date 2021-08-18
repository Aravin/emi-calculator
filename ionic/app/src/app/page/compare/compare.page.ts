import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.page.html',
  styleUrls: ['./compare.page.scss'],
})
export class ComparePage implements OnInit {

  compareForm: FormGroup;
  totalEmi1 = 0;
  totalEmi2 = 0;
  totalInterest1 = 0;
  totalInterest2 = 0;
  diffAmount = '0';
  minLoan = 0;

  barChartOptions: ChartOptions = {
    responsive: true,
    showLines: false,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true,
          }
      }],
    },
    tooltips: {
      enabled: false,
    }
  };
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataSets[] = [];
  barChartLabels: Label[] = ['Loan 1', 'Loan 2'];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.compareForm = this.formBuilder.group({
      loanAmount: ['', [Validators.required, Validators.min(1), Validators.max(999999999)]],
      interest: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      tenure: ['', [Validators.required, Validators.min(1), Validators.max(100)]],

      loanAmount2: ['', [Validators.required, Validators.min(1), Validators.max(999999999)]],
      interest2: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      tenure2: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }

  compareLoan() {
    if (
      !this.compareForm.value.loanAmount
      || !this.compareForm.value.interest
      || !this.compareForm.value.tenure
      || !this.compareForm.value.loanAmount2
      || !this.compareForm.value.interest2
      || !this.compareForm.value.tenure2
      ) {
      return;
    }

    const loanAmount1 = this.compareForm.value.loanAmount;
    const loanAmount2 = this.compareForm.value.loanAmount2;

    const interest1 = this.compareForm.value.interest / 12 / 100;
    const interest2 = this.compareForm.value.interest2 / 12 / 100;

    const tenure1 = this.compareForm.value.tenure * 12;
    const tenure2 = this.compareForm.value.tenure2 * 12;

    const emi1 =
      parseFloat((loanAmount1 * interest1 * (Math.pow(1 + interest1, tenure1)) / (Math.pow(1 + interest1, tenure1) - 1)).toFixed(2));
    const emi2 =
      parseFloat((loanAmount2 * interest2 * (Math.pow(1 + interest2, tenure2)) / (Math.pow(1 + interest2, tenure2) - 1)).toFixed(2));

    this.totalEmi1 = parseFloat((emi1 * tenure1).toFixed(2));
    this.totalEmi2 = parseFloat((emi2 * tenure2).toFixed(2));

    this.totalInterest1 = parseFloat((this.totalEmi1 - loanAmount1).toFixed(2));
    this.totalInterest2 = parseFloat((this.totalEmi2 - loanAmount2).toFixed(2));

    this.diffAmount = Math.abs(this.totalInterest1 - this.totalInterest2).toFixed(2);
    this.minLoan = [this.totalInterest1, this.totalInterest2].indexOf(Math.min(this.totalInterest1, this.totalInterest2));


    this.barChartData = [
      { data: [this.totalEmi1, this.totalEmi2], label: 'Total EMI', backgroundColor: '#721af0', hoverBackgroundColor:  '#6200EE'},
      { data: [this.totalInterest1, this.totalInterest2], label: 'Total Interest', backgroundColor: '#1cdecb', hoverBackgroundColor:  '#03DAC5'},
    ];

  }

}
