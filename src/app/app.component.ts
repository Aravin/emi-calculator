import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages = [
    {
      title: 'EMI Calculation',
      url: '/tabs/tab1',
      icon: 'calculator-outline'
    },
    {
      title: 'PRO EMI Calculation',
      url: '/tabs/pro',
      icon: 'calculator-outline'
    },
    {
      title: 'SI Calculation',
      url: '/tabs/tab2',
      icon: 'shield-checkmark-outline'
    },
    {
      title: 'Compare Loan',
      url: '/compare',
      icon: 'podium-outline'
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: 'settings-outline'
    },
    {
      title: 'About Us',
      url: '/about',
      icon: 'information-circle-outline'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  gotoPlayStore() {
      window.open('https://play.google.com/store/apps/details?id=io.epix.emi', '_blank');
  }
}
