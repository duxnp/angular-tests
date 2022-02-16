import {
    trigger,
    animate,
    style,
    group,
    query,
    transition,
    keyframes
} from '@angular/animations';

// Another way to do this...
// Template: [@growInOut]="'in'"
// transition: '* => in'
// transition: 'in => *'
export const growInOut = trigger('growInOut', [
    transition(':enter',
    [
        animate('0.1s',
            keyframes([
                style({ transform: 'scale(0)' }),
                style({ transform: 'scale(1)' })
            ]))
    ]),
    transition(':leave',
    [
        animate('0.1s',
            keyframes([
                style({ transform: 'scale(1)' }),
                style({ transform: 'scale(0)' })
            ]))
    ]),
]);
