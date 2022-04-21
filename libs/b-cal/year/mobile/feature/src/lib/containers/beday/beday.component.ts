import { CommonModule, Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  OnInit
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { SharedSelectors } from '@ng-tests/b-cal/shared/data-access';
import { BedayCardModule, SayBedayModule } from '@ng-tests/b-cal/year/web/ui';
import { filterNullish } from '@ng-tests/shared/util';

@Component({
  selector: 'bry-beday',
  templateUrl: './beday.component.html',
  styleUrls: ['./beday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BedayComponent {
  beday$ = this.store
    .select(SharedSelectors.selectBedayEntity)
    .pipe(filterNullish());

  constructor(
    public route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private navCtrl: NavController,
    private location: Location
  ) {}

  goBack() {
    // this.router.navigate(['2022']);
    this.navCtrl.back();
    // this.location.back();
  }
}

@NgModule({
  imports: [CommonModule, IonicModule, BedayCardModule],
  declarations: [BedayComponent],
  exports: [BedayComponent],
})
export class BedayComponentModule {}
