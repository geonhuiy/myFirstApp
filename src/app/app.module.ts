import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {
  IonicApp,
  IonicErrorHandler,
  IonicModule,
  NavController,
} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MediaProvider } from '../providers/media/media';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { LogoutPage } from '../pages/logout/logout';
import { MenuPage } from '../pages/menu/menu';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginRegisterPage,
    LogoutPage,
    MenuPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    LogoutPage,
    LoginRegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    MediaProvider,
  ],
})
export class AppModule {
}
