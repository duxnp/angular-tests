import { ChildOneComponent } from './child-one/child-one.component';
import { ChildTwoComponent } from './child-two/child-two.component';
import { ParentComponent } from './parent/parent.component';

export const containers: any[] = [
  ChildOneComponent,
  ChildTwoComponent,
  ParentComponent,
];

export * from './child-one/child-one.component';
export * from './child-two/child-two.component';
export * from './parent/parent.component';
