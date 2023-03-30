const baseUrlApp: string = '../../';
const host: string = 'http://synologynas.ddns.net:8800/prod-moneystats-service';
const subDomain = 'moneystats/';

export const environment = {
  production: true,
  baseUrl: '../../' + subDomain,
  baseUrlHeader: '../../../../' + subDomain,
  baseUrlSettings: '../../../../../' + subDomain,
  baseUrlDashboard: '../../../' + subDomain,
  baseUrlVersion: '../../../../../../' + subDomain,
  version: 'Beta 0.9.30',

  // Mock Data
  getUserUrl: baseUrlApp + 'assets/core/mock/user.mock.json',
  getDashboardDataUrlMock: baseUrlApp + 'assets/core/mock/dashboard.mock.json',
  getWalletDataUrl: baseUrlApp + 'assets/core/mock/wallets.mock.json',
  getResumeDataUrlMock: baseUrlApp + 'assets/core/mock/stats.mock.json',
  getTemplate: baseUrlApp + 'assets/template/template.json',

  // Datas
  registerDataUrl: host + '/v1/auth/sign-up',
  loginDataUrl: host + '/v1/auth/login',
  checkLoginDataUrl: host + '/v1/auth/check-login',
  forgotPasswordUrl: host + '/v1/auth/forgot-password',
  resetPasswordUrl: host + '/v1/auth/reset-password',
  addUpdateWalletDataUrl: host + '/v1/wallet/insert-update',
  uploadImage: host + '/v1/upload/attachment',
  imageSizeMax: 10000000,
  listWalletDataurl: host + '/v1/wallet/list',
  getDashboardDataUrl: host + '/v1/app/dashboard',
  getResumeDataUrl: host + '/v1/app/resume',
  addStatsDataUrl: host + '/v1/app/add/stats',
  openGithubIssues: host + '/v1/app/report/bug',
  contactSupport: host + '/v1/app/contact',
  updateUserDataUrl: host + '/v1/auth/update/user',
  forgotPassword: true,
};
