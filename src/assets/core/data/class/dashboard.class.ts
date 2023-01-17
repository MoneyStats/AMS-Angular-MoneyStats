import {
  CategoryInterface,
  DashboardInterface,
  StatsInterface,
  WalletInterface,
} from '../interfaces/dashboard.interface';
import { GenericModel } from './generic.class';

export class Dashboard implements DashboardInterface {
  balance: number = 0;
  value: string = 'USD';
  performace: number = 0;
  performanceValue: number = 0;
  performanceSince: Date = new Date();
  performanceLastDate: Date = new Date();
  lastStatsPerformance: number = 0;
  lastStatsBalanceDifference: number = 0;
  statsWalletDays: string[] = [];
  statsBalances: number[] = [];
  categories: Category[] = [];
  wallets: Wallet[] = [];
}

export class Wallet extends GenericModel implements WalletInterface {
  name!: string;
  img: string =
    'https://scarpedimaremma.com/wp-content/uploads/2022/09/Sfondo-di-IMG_1265-rimosso-300x300.png';
  category!: string;
  allTimeHigh: number = 0;
  allTimeHighDate: Date = new Date();
  totalPerformance: number = 0; // TODO: Forse da rimuovere
  highPrice: number = 0;
  highPriceDate: Date = new Date();
  lowPrice: number = 0;
  lowPriceDate: Date = new Date();
  performanceLastStats: number = 0;
  differenceLastStats: number = 0;
  dateLastStats: Date = new Date();
  balance: number = 0;
  newBalance!: number; // Local Variable, used just for save
  history: Stats[] = [];
}

export class Stats extends GenericModel implements StatsInterface {
  date!: string;
  balance!: number;
  percentage!: number;
  trend!: number;
}

export class Category extends GenericModel implements CategoryInterface {
  name!: string;
  img!: string;
}
