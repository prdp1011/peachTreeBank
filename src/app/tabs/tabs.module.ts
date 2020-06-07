import { NgModule } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { AllModule } from '../all.module';
import { CapitalListComponent } from '../capital-list/capital-list.component';
import { TrasactionListComponent } from '../trasaction-list/trasaction-list.component';
import { Routes, RouterModule } from '@angular/router';
import { BalancePipe } from './pipes/balance.pipe';
import { AddNewComponent } from '../trasaction-list/add-new/add-new.component';
import { UploadDocComponent } from '../capital-list/upload-doc/upload-doc.component';
import { DropfileDirective } from './pipes/dropfile.directive';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';

const routes: Routes = [

  {
    path: '',
    component: TabsComponent
  }
];


@NgModule({
  declarations: [TabsComponent,
     CapitalListComponent,
     AddNewComponent,
     UploadDocComponent,
     DocViewerComponent,
      TrasactionListComponent, BalancePipe, DropfileDirective],
  imports: [
    AllModule,
    RouterModule.forChild(routes)
  ],
  entryComponents:[DocViewerComponent]
})
export class TabsModule { }
