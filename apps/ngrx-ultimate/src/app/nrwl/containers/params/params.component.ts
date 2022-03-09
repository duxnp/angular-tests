import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../store';

@Component({
  selector: 'app-params',
  templateUrl: './params.component.html',
  styleUrls: ['./params.component.scss'],
})
export class ParamsComponent implements OnInit {
  routeParams$ = this.store.select(fromRoot.selectRouteNestedParams);
  route$ = this.store.select(fromRoot.selectCurrentRoute);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  paramOneChange(param: string) {
    this.router.navigate(['nrwl', 'params', param, 'one']);
  }

  paramTwoChange(param: string) {
    this.router.navigate(['nrwl', 'params', 'foo', param]);
  }

  queryChange(param: string) {
    this.router.navigate([], {
      queryParams: { step: param },
      queryParamsHandling: 'merge',
    });
  }
}
