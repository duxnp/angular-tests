import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'nbt-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent implements OnInit {
  title!: string;
  closeBtnName!: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.list.push('PROFIT!!!');
  }
}
