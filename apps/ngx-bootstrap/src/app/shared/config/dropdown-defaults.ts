import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

export function getDropdownConfig(): BsDropdownConfig {
  return Object.assign(new BsDropdownConfig(), { isAnimated: true });
}
