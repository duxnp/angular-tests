import { ModalOptions } from 'ngx-bootstrap/modal';

// This overwrites only the options you list but leaves the rest default
export function getModalConfig(): ModalOptions {
  return Object.assign(new ModalOptions(), { class: 'modal-xl' });
}
