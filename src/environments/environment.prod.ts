//const baseUrlApp: string = '../../';
const baseUrlApp: string = 'https://moneystats.github.io/';
const host: string = 'https://moneystats.service.giovannilamarmora.com';
export const subDomain = '';

export const environment = {
  envType: 'PROD',
  production: true,
  subDomain: subDomain,
  baseUrl: baseUrlApp,
  baseUrlHeader: baseUrlApp,
  baseUrlSettings: baseUrlApp,
  baseUrlDashboard: baseUrlApp,
  baseUrlVersion: baseUrlApp,
  //baseUrl: '../../' + subDomain,
  //baseUrlHeader: '../../../../' + subDomain,
  //baseUrlSettings: '../../../../../' + subDomain,
  //baseUrlDashboard: '../../../' + subDomain,
  //baseUrlVersion: '../../../../../../' + subDomain,
  version: '2.1.2',
  hostService: host + subDomain,

  // Mock Data
  getUserUrl: baseUrlApp + 'assets/core/mock/user.mock.json',
  getDashboardDataUrlMock: baseUrlApp + 'assets/core/mock/dashboard.mock.json',
  getWalletDataUrl: baseUrlApp + 'assets/core/mock/wallets.mock.json',
  getResumeDataUrlMock: baseUrlApp + 'assets/core/mock/stats.mock.json',
  getTemplate: baseUrlApp + 'assets/template/template.json',
  getCryptoDashboardMock: baseUrlApp + 'assets/core/mock/crypto.dash.mock.json',
  getCryptoPriceMock: baseUrlApp + 'assets/core/mock/crypto.price.mock.json',
  getCryptoResumeMock: baseUrlApp + 'assets/core/mock/crypto.stats.mock.json',
  getCryptoAssetsMock: baseUrlApp + 'assets/core/mock/crypto.assets.mock.json',
  getCryptoDetailsMock:
    baseUrlApp + 'assets/core/mock/crypto.details.mock.json',

  /*
   * Authentication Datas
   */
  registerDataUrl: host + '/v1/auth/sign-up',
  loginDataUrl: host + '/v1/auth/login',
  forgotPasswordUrl: host + '/v1/auth/forgot-password',
  resetPasswordUrl: host + '/v1/auth/reset-password',

  /*
   * Token
   */
  userInfoDataUrl: host + '/v1/oAuth/userInfo',
  refreshTokenUrl: host + '/v1/oAuth/token/refresh',
  refreshTime: 900000,

  /*
   * App
   */
  addUpdateWalletDataUrl: host + '/v1/wallet/insert-update',
  uploadImage: host + '/v1/upload/attachment',
  imageSizeMax: 1000000,
  listWalletDataurl: host + '/v1/wallet/list',
  getDashboardDataUrl: host + '/v1/app/dashboard',
  getResumeDataUrl: host + '/v1/app/resume',
  addStatsDataUrl: host + '/v1/app/add/stats',
  openGithubIssues: host + '/v1/app/report/bug',
  contactSupport: host + '/v1/app/contact',
  updateUserDataUrl: host + '/v1/auth/update/user',
  backupDataUrl: host + '/v1/app/backup',
  restoreDataUrl: host + '/v1/app/restore',
  forgotPassword: true,

  /*
   * Crypto Section
   */
  cleanCacheUrl: host + '/v1/crypto/cache/clean',
  marketDataUrl: host + '/v1/crypto/marketData/import',
  addCryptoAssetDataUrl: host + '/v1/crypto/asset/addOrUpdate',
  addCryptoAssetsDataUrl: host + '/v1/crypto/asset/list/addOrUpdate',
  getCryptoAssetDataUrl: host + '/v1/crypto/asset/getAll',
  getCryptoDetailsDataUrl: host + '/v1/crypto/asset/get',
  getCryptoDashboardDataUrl: host + '/v1/crypto/dashboard',
  getCryptoResumeDataUrl: host + '/v1/crypto/resume',
  getMarketDataUrl: host + '/v1/market-data/get',

  // Cache
  cacheEnable: true,
  cacheTimeout: 180000,
};
