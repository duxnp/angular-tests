import { AlertConfig } from 'ngx-bootstrap/alert';

// I guess if you provite the options this way it overwrites only the options you list but leaves the rest default
export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

// They didn't do it this way because you get an error message that you are missing come required properties
// export const alertOptions: AlertConfig = {
//   type: 'success'
// };
