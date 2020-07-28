import { Component, OnInit, Input } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { Transaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  @Input('transactions') transactions: Transaction[] = [];
  countofValidatePass: number = 0;
  countofScreenFail: number = 0;
  countofValidateFail: number = 0;
  countofScreenPass: number = 0;
  statusWithCount = [{ 
    status: 'VALIDATE PASS',
    count: this.countofValidatePass,
    description: 'Transactions passed initial validations'
  },
  {
    status: 'VALIDATE FAIL',
    count: this.countofValidateFail,
    description: 'Transactions failed initial validations'
  },
  {
    status: 'SCREEN PASS',
    count: this.countofScreenPass,
    description: 'Transactions passed screening'
  },
  {
    status: 'SCREEN FAIL',
    count: this.countofScreenFail,
    description: 'Transactions failed screening'
  }
  ];
  constructor() { }

  ngOnInit() {
    this.countofScreenFail = this.transactions.filter((item => item.status === "SCREEN_FAIL")
    ).length;
    this.countofScreenPass = this.transactions.filter((item => item.status === "SCREEN_PASS")
    ).length;
    this.countofValidatePass = this.transactions.filter((item => item.status === "VALIDATE_PASS")
    ).length;
    this.countofValidateFail = this.transactions.filter((item => item.status === "VALIDATE_FAIL")
    ).length;
    this.statusWithCount = [{
      status: 'VALIDATE PASS',
      count: this.countofValidatePass,
      description: 'Transactions passed initial validations'
    },
    {
      status: 'VALIDATE FAIL',
      count: this.countofValidateFail,
      description: 'Transactions failed initial validations'
    },
    {
      status: 'SCREEN PASS',
      count: this.countofScreenPass,
      description: 'Transactions passed screening'
    },
    {
      status: 'SCREEN FAIL',
      count: this.countofScreenFail,
      description: 'Transactions failed screening'
    }
    ];
  }

}
