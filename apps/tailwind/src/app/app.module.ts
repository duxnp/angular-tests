import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleComponent } from './article/article.component';
import { CityCardComponent } from './city-card/city-card.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { WorkcationComponent } from './workcation/workcation.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    WorkcationComponent,
    CityCardComponent,
    PropertyCardComponent,
    PropertiesComponent,
    NavbarComponent,
    DropdownComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
