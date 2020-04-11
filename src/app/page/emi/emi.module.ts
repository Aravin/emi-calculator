import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmiPage } from './emi.page';
import {MatTableModule} from '@angular/material/table';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    ChartsModule,
    RouterModule.forChild([{ path: '', component: EmiPage }])
  ],
  declarations: [EmiPage]
})
export class EmiPageModule {}
