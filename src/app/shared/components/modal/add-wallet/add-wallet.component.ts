import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Category, Wallet } from 'src/assets/core/data/class/dashboard.class';
import { ModalConstant } from 'src/assets/core/data/constant/modal.constant';
import { DashboardService } from 'src/assets/core/services/dashboard.service';
import { WalletService } from 'src/assets/core/services/wallet.service';
import { SwalService } from 'src/assets/core/utils/swal.service';

@Component({
  selector: 'app-add-wallet',
  templateUrl: './add-wallet.component.html',
  styleUrls: ['./add-wallet.component.scss'],
})
export class AddWalletComponent implements OnInit {
  @Output('emitAddWallet') emitAddWallet = new EventEmitter<Wallet>();
  @Input('categoriesInput') categoriesInput?: Category[];
  wallet: Wallet = new Wallet();
  categories: Category[] = [];

  defaultImg: boolean = false;
  checkbox: boolean = true;
  walletImg: string =
    'https://scarpedimaremma.com/wp-content/uploads/2022/09/Sfondo-di-IMG_1265-rimosso-300x300.png';

  constructor(
    private dashboardService: DashboardService,
    private swalService: SwalService,
    private translate: TranslateService,
    private walletService: WalletService
  ) {}

  public get modalConstant(): typeof ModalConstant {
    return ModalConstant;
  }

  ngOnInit(): void {
    this.categories = this.dashboardService.dashboard.categories;
  }

  importimage() {
    this.swalService.addImageSwal(
      this.translate.instant('wallet.modal.imageModal.title'),
      this.translate.instant('wallet.modal.imageModal.subTitle'),
      this.translate.instant('wallet.modal.imageModal.continue'),
      this.translate.instant('wallet.modal.imageModal.cancel')
    );
    this.updateImageData();
    this.checkbox = false;
  }

  updateImageData() {
    if (this.swalService.walletImg === undefined) {
      setTimeout(() => {
        this.updateImageData();
      }, 100 * 10);
    } else {
      this.walletImg = this.swalService.walletImg;
    }
  }

  addWallet() {
    let walletToSave = this.wallet;
    walletToSave.img = this.walletImg;

    // Save Wallet
    this.emitAddWallet.emit(walletToSave);
  }

  validateBtn(): boolean {
    return (this.checkbox && this.defaultImg) ||
      (!this.checkbox && !this.defaultImg)
      ? true
      : false;
  }
}