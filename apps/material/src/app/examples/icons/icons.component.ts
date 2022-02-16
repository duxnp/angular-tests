import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  constructor(
    private _iconRegistry: MatIconRegistry,
    private _sanitizer: DomSanitizer
  ) {
    _iconRegistry.addSvgIcon(
      'fa-angular',
      _sanitizer.bypassSecurityTrustResourceUrl('assets/mat-icons/fa-angular.svg')
    );
  }

  ngOnInit() {
  }

}
