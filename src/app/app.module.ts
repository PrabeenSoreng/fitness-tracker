import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FirestoreSettingsToken } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { SharedModule } from './shared/shared.module';
import { UIService } from './shared/ui.service';
import { TrainingModule } from './training/training.module';
import { TrainingService } from './training/training.service';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    TrainingModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    TrainingService,
    UIService,
    {provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
