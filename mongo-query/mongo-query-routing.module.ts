import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MongoQueryGeneratorComponent } from './mongo-query-generator/mongo-query-generator.component';

const routes: Routes = [

  {path:'',redirectTo: 'createQuery', pathMatch: 'full'}, 
  {path:'createQuery',component: MongoQueryGeneratorComponent},
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MongoQueryRoutingModule { }
