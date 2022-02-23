import { Component, HostBinding, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from '../../../core/service/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent {
  @HostBinding('class.ngb-toasts') ngbToasts = true;

  constructor(public toastService: ToastService) {}

  isTemplate(toast: any) {
    return toast.textOrTpl instanceof TemplateRef;
  }
}
