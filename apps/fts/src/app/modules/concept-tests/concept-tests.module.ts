import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CheckValueComponent } from './components/check-value/check-value.component';
import { InjectorTwoComponent } from './components/injector-two/injector-two.component';
import { InjectorComponent } from './components/injector/injector.component';
import { TweetComponent } from './components/tweet/tweet.component';
import { WtfComponent } from './components/wtf/wtf.component';
import { ConceptTestsRoutingModule } from './concept-tests-routing.module';
import { DeferLoadTestComponent } from './pages/defer-load-test/defer-load-test.component';
import { InfiniteScrollTestComponent } from './pages/infinite-scroll-test/infinite-scroll-test.component';
import { InjectTestComponent } from './pages/inject-test/inject-test.component';
import { TemplateFormTestComponent } from './pages/template-form-test/template-form-test.component';

@NgModule({
  declarations: [
    TweetComponent,
    WtfComponent,
    DeferLoadTestComponent,
    InfiniteScrollTestComponent,
    TemplateFormTestComponent,
    InjectTestComponent,
    InjectorComponent,
    InjectorTwoComponent,
    CheckValueComponent,
  ],
  imports: [CommonModule, ConceptTestsRoutingModule, SharedModule],
})
export class ConceptTestsModule {}
