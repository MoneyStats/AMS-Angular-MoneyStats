import { Component, Input, OnInit } from '@angular/core';
import { ScreenService } from 'src/assets/core/utils/screen.service';
import { ActivatedRoute } from '@angular/router';
import { Stats, Wallet } from 'src/assets/core/data/class/dashboard.class';
import { ApexOptions } from 'src/assets/core/data/constant/apex.chart';
import { ChartService } from 'src/assets/core/utils/chart.service';
import { WalletService } from 'src/assets/core/services/wallet.service';
import { ModalConstant } from 'src/assets/core/data/constant/constant';
import { SwalService } from 'src/assets/core/utils/swal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wallet-details',
  templateUrl: './wallet-details.component.html',
  styleUrls: ['./wallet-details.component.scss'],
})
export class WalletDetailsComponent implements OnInit {
  environment = environment;
  public chartAll?: Partial<ApexOptions>;
  public chart1Y?: Partial<ApexOptions>;
  public chart3Y?: Partial<ApexOptions>;

  coinSymbol?: string;
  wallet?: Wallet;
  walletName?: string;
  walletId?: number;
  constructor(
    public screenService: ScreenService,
    private route: ActivatedRoute,
    private charts: ChartService,
    public walletService: WalletService
  ) {}

  public get modalConstant(): typeof ModalConstant {
    return ModalConstant;
  }

  ngOnInit(): void {
    this.screenService.setupHeader();
    this.screenService.hideFooter();
    this.route.params.subscribe((w: any) => {
      this.walletId = w.id;
      this.walletName = w.wallet;
    });

    this.wallet = this.walletService.walletDetails?.find(
      (w: Wallet) => w.id == this.walletId && w.name === this.walletName
    );

    if (this.wallet?.history.find((w) => w.id === undefined)) {
      this.wallet?.history.splice(0, 1);
    }

    this.renderGraph();
    if (this.screenService!.screenWidth! <= 780) {
      const image = document.getElementById('gradientSection');
      image!.style.backgroundImage = 'url(' + this.wallet!.img + ')';
    }
    this.walletService.walletHistory = this.wallet;
    this.coinSymbol = this.walletService.coinSymbol;
  }

  renderGraph() {
    setTimeout(() => {
      this.chartAll = this.charts.renderChartWallet(
        this.wallet?.name!,
        this.wallet?.history!
      );
    }, 100);
  }

  graph1Y() {
    let lastYear = this.wallet?.history.filter(
      (h) =>
        h.date.toString().split('-')[0] === new Date().getFullYear().toString()
    );
    setTimeout(() => {
      this.chart1Y = this.charts.renderChartWallet(
        this.wallet?.name!,
        lastYear!
      );
    }, 200);
  }

  graph3Y() {
    let last3 = [
      new Date().getFullYear().toString(),
      (new Date().getFullYear() - 1).toString(),
      (new Date().getFullYear() - 2).toString(),
    ];
    let last3Year = this.wallet?.history.filter((h) =>
      last3.includes(h.date.toString().split('-')[0])
    );
    setTimeout(() => {
      this.chart3Y = this.charts.renderChartWallet(
        this.wallet?.name!,
        last3Year!
      );
    }, 200);
  }

  percentageWalletInTotal(): number {
    return (this.wallet!.balance * 100) / this.walletService?.totalBalance!;
  }
}
