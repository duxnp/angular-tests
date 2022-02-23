import { Pipe, PipeTransform, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Pipe({
  name: 'day',
  pure: true,
})
export class DayPipe implements PipeTransform {
  transform(day: string | undefined): string {
    return `${day}day`;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [DayPipe],
  exports: [DayPipe],
})
export class DayPipeModule {}
