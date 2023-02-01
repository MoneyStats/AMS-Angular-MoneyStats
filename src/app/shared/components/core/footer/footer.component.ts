import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalConstant } from 'src/assets/core/data/constant/constant';
import { ScreenService } from 'src/assets/core/utils/screen.service';
import { ToastService } from 'src/assets/core/utils/toast.service';
import { AvailableSoonComponent } from '../../modal/available-soon/available-soon.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  constructor(
    public toast: ToastService,
    private screenService: ScreenService
  ) {}

  public get modalConstant(): typeof ModalConstant {
    return ModalConstant;
  }

  ngOnInit(): void {}

  availableSoon() {
    this.toast.availableSoon();
  }

  goToDashboard() {
    this.screenService.goToDashboard();
  }

  goToWallet() {
    this.screenService.goToWallet();
  }

  goToSettings() {
    this.screenService.goToSettings();
  }

  goToStats() {
    this.screenService.goToStats();
  }
}
