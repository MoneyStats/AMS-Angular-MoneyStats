import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Operation } from 'src/assets/core/data/class/crypto.class';
import {
  ModalConstant,
  OperationsType,
} from 'src/assets/core/data/constant/constant';
import { CryptoService } from 'src/assets/core/services/crypto.service';

@Component({
  selector: 'app-close-operation',
  templateUrl: './close-operation.component.html',
  styleUrls: ['./close-operation.component.scss'],
})
export class CloseOperationComponent implements OnInit, OnChanges {
  @Input('modalId') modalId: string = '';
  @Input('operation') operation?: Operation = new Operation();
  cryptoCurrency: string = '';

  currentPrice: number = 0;
  isEditActive: boolean = false;

  constructor(private cryptoService: CryptoService) {}

  public get modalConstant(): typeof ModalConstant {
    return ModalConstant;
  }

  public get operationTypeConstant(): typeof OperationsType {
    return OperationsType;
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getData();
  }

  getData() {
    this.cryptoCurrency = this.cryptoService.cryptoDashboard.currency;
    let currentPrice =
      this.operation?.entryQuantity! * this.operation?.asset?.current_price!;
    this.currentPrice = parseFloat(currentPrice.toFixed(2));
    let operation = this.operation;
    operation!.exitDate = new Date();
    operation!.exitPrice = operation?.asset?.current_price;
    operation!.exitPriceValue = parseFloat(currentPrice.toFixed(2));
    operation!.exitQuantity = parseFloat(
      (
        operation!.entryPriceValue! / operation!.assetSell!.current_price!
      ).toFixed(8)
    );

    operation!.performance = parseFloat(
      (
        ((currentPrice - this.operation?.entryPriceValue!) / currentPrice) *
        100
      ).toFixed(2)
    );
    operation!.trend = parseFloat(
      (currentPrice - this.operation?.entryPriceValue!).toFixed(2)
    );
  }

  refreshData() {
    let operation = this.operation;
    let currentPrice =
      this.operation?.entryQuantity! * this.operation?.exitPrice!;
    operation!.performance = parseFloat(
      (
        ((currentPrice - this.operation?.entryPriceValue!) / currentPrice) *
        100
      ).toFixed(2)
    );
    operation!.trend = parseFloat(
      (currentPrice - this.operation?.entryPriceValue!).toFixed(2)
    );
    this.isEditActive = false;
  }
}