import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CryptoComponent } from './crypto.component';
import { CryptoDashboardComponent } from './crypto-dashboard/crypto-dashboard.component';
import { RequirementsComponent } from './requirements/requirements.component';
import { CryptoAssetComponent } from './crypto-asset/crypto-asset.component';
import { CryptoDetailsComponent } from './crypto-asset/crypto-details/crypto-details.component';
import { CryptoResumeComponent } from './crypto-resume/crypto-resume.component';
import { OperationExchangeComponent } from './operation-exchange/operation-exchange.component';
import { OperationsComponent } from './operations/operations.component';

const routes: Routes = [
  {
    path: '',
    component: CryptoComponent,
    children: [
      {
        path: 'dashboard',
        component: CryptoDashboardComponent,
      },
      {
        path: 'requirements',
        component: RequirementsComponent,
      },
      {
        path: 'asset',
        component: CryptoAssetComponent,
      },
      {
        path: 'asset/details/:identifier',
        component: CryptoDetailsComponent,
      },
      {
        path: 'resume',
        component: CryptoResumeComponent,
      },
      {
        path: 'operation/:operationType/:wallet/:fiat',
        component: OperationExchangeComponent,
      },
      {
        path: 'operations/:currency/:uuid',
        component: OperationsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CryptoRoutingModule {}
