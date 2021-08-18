import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { IonicModule } from '@ionic/angular';

import { ComparePageRoutingModule } from './compare-routing.module';

import { ComparePage } from './compare.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComparePageRoutingModule,
    ChartsModule
  ],
  declarations: [ComparePage]
})
export class ComparePageModule {}
