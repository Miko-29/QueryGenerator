import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MongoQueryRoutingModule } from './mongo-query-routing.module';

import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { OrderByModule } from '../order-by-pipe/order-by.module';


import { StartFromPipeModule } from '../startFrom-pipe/startFrom.module';
import { LimitPipeModule } from '../limitTo-pipe/limitTo-pipe.module';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { TagInputModule } from 'ngx-chips';
import { MongoQueryGeneratorComponent } from './mongo-query-generator/mongo-query-generator.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    MongoQueryGeneratorComponent
    ],
    imports: [
    
      NgxDatatableModule,
      NgxJsonViewerModule,
      CommonModule,
      FormsModule,
      NgSelectModule,
      OrderByModule,
      NgxDaterangepickerMd.forRoot(),
      StartFromPipeModule,
      LimitPipeModule,
      
      TagInputModule,
   
      MongoQueryRoutingModule
    ]

})
export class MongoQueryModule { }
