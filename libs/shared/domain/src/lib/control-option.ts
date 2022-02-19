export interface ControlOption {
  value: string | number | boolean;
  name: string;
  caption?: string;
  disabled?: boolean;
  tooltip?: string;
  id?: string;
}

export const initialControlOption: ControlOption = {
  name: '',
  value: '',
};
