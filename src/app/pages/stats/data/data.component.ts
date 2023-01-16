import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CoinSymbol } from 'src/assets/core/data/class/coin';
import { Dashboard, Stats } from 'src/assets/core/data/class/dashboard.class';
import { ApexOptions } from 'src/assets/core/data/constant/apex.chart';
import { ChartService } from 'src/assets/core/utils/chart.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit, OnChanges {
  public chartOptions?: Partial<ApexOptions>;
  public chartPie?: Partial<ApexOptions>;
  public chartBar?: Partial<ApexOptions>;
  @Input('dashboard') dashboard: Dashboard = new Dashboard();
  @Input('coinSymbol') coinSymbol: string = '';
  balances: Array<number> = [];
  tableBalance: Array<any> = [];

  constructor(private charts: ChartService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.tableBalance = [];
    this.balances = [];
    this.dashboard.statsWalletDays.forEach((date) => {
      console.log(date);
      this.tableBalance.push(this.tableCreate(date));
    });
    this.renderChart();
  }

  ngOnInit(): void {
    this.tableBalance = [];
    this.balances = [];
    this.dashboard.statsWalletDays.forEach((date) => {
      console.log(date);
      this.tableBalance.push(this.tableCreate(date));
    });
    this.renderChart();
  }

  renderChart() {
    setTimeout(() => {
      this.chartOptions = this.charts.renderChartLine(this.dashboard);
      this.chartPie = this.charts.renderChartPie(this.dashboard.wallets);
      this.chartBar = this.charts.renderChartBar(
        this.dashboard.statsWalletDays,
        this.balances
      );
    }, 100);
  }

  currentYear(): string {
    return new Date().getFullYear().toString();
  }

  tableCreate(date: string) {
    let array: any = [];
    this.dashboard.wallets.forEach((w) => {
      let history = w.history.find((h) => h.date === date);
      array.push(history);
    });
    let total: Stats = new Stats();
    total.balance = 0;
    total.date = date;
    array.forEach((h: any) => {
      total.balance = total.balance + h.balance;
    });
    let percentage = (
      ((total.balance - this.balances[this.balances.length - 1]) /
        this.balances[this.balances.length - 1]) *
      100
    ).toFixed(2);
    total.percentage = parseFloat(percentage);

    let trendStats: Stats = new Stats();
    let trend = (
      total.balance - this.balances[this.balances.length - 1]
    ).toFixed(2);
    trendStats.balance = parseFloat(trend);

    array.push(total);
    array.push(trendStats);
    this.balances.push(total.balance);
    array.index = array.length - 1;
    return array;
  }
}