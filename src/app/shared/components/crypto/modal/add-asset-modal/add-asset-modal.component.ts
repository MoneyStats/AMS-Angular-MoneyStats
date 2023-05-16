import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Asset } from 'src/assets/core/data/class/crypto.class';
import { Category, Wallet } from 'src/assets/core/data/class/dashboard.class';
import { ModalConstant } from 'src/assets/core/data/constant/constant';
import { CryptoService } from 'src/assets/core/services/crypto.service';
import { DashboardService } from 'src/assets/core/services/dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-asset-modal',
  templateUrl: './add-asset-modal.component.html',
  styleUrls: ['./add-asset-modal.component.scss'],
})
export class AddAssetModalComponent implements OnInit {
  environment = environment;
  @Input('modalId') modalId: string = '';
  @Output('emitAddAsset') emitAddAsset = new EventEmitter<Wallet>();

  asset?: Asset;
  modelAsset: string = '';
  isAssetSelected: boolean = false;
  warning: boolean = false;
  balance?: number;
  invested?: number;

  @Input('wallets') wallets: Wallet[] = [];
  wallet?: Wallet;
  modelWallet: string = '';
  isWalletSelected: boolean = false;

  cryptoTypes: string[] = ['Holding', 'Trading'];
  cryptoPrices: Asset[] = [];
  filterCryptoPrices: Asset[] = [];
  search: string = '';

  categories: Category[] = [];

  falseIf: boolean = false;

  constructor(
    public dashboardService: DashboardService,
    private cryptoService: CryptoService
  ) {}

  public get modalConstant(): typeof ModalConstant {
    return ModalConstant;
  }

  ngOnInit(): void {
    this.categories = this.dashboardService.dashboard.categories;
    if (this.wallets == undefined) {
      this.wallets = this.dashboardService.dashboard.wallets.filter(
        (w) => w.category == 'Crypto'
      );
    } else this.wallets;

    this.getCryptoPrices();
  }

  getCryptoPrices() {
    this.cryptoService.getCryptoPrice().subscribe((data) => {
      this.cryptoPrices = data.data;
      this.filterCryptoPrices = data.data;
    });
  }

  filterCryptoPrice(filter: string) {
    this.filterCryptoPrices = this.cryptoPrices.filter(
      (cp) => cp.name?.includes(filter) || cp.symbol?.includes(filter)
    );
  }

  onKeySearch(event: any) {
    setTimeout(() => {
      this.filterCryptoPrice(this.search);
    }, 1000);
  }

  selectWallet() {
    this.wallet = this.wallets.find((w) => w.name == this.modelWallet);
    this.isWalletSelected = true;
  }

  selectAsset() {
    if (
      !this.wallet?.assets ||
      (this.wallet?.assets.length > 0 &&
        !this.wallet?.assets.find((a) => a.name == this.modelAsset))
    ) {
      this.warning = false;
      this.asset = this.cryptoPrices.find((c) => c.name == this.modelAsset);
      this.isAssetSelected = true;
    } else this.warning = true;
  }

  selectAssetInput(name: string) {
    this.search = '';
    this.modelAsset = name;
  }

  saveAsset() {
    if (
      !this.wallet?.assets ||
      (this.wallet?.assets.length > 0 &&
        !this.wallet?.assets.find((a) => a.name == this.asset?.name))
    ) {
      this.warning = false;
      if (this.wallet?.assets == undefined) {
        this.wallet!.assets = [];
      }
      this.wallet?.assets.push(this.asset!);
      this.emitAddAsset.emit(this.wallet);
      this.resetModal();
    } else {
      this.isAssetSelected = false;
      this.modelAsset = '';
      this.warning = true;
    }
  }

  resetModal() {
    this.warning = false;
    this.isAssetSelected = false;
    this.isWalletSelected = false;
    this.modelAsset = '';
    this.modelWallet = '';
  }
}