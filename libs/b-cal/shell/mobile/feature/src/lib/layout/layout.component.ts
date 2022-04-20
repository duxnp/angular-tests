import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'bry-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {}

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [AppLayoutComponent],
  exports: [AppLayoutComponent],
})
export class AppLayoutModule {}
