import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormComponent } from './form/form.component';
import { RootComponent } from './root/root.component';
import { InputComponent } from './html/input/input.component';

@NgModule({
  declarations: [
    FormComponent,
    RootComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
