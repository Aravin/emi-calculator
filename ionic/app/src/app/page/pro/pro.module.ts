import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProPage } from './pro.page';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSliderModule,
    IonicModule,
    MatCardModule,
    RouterModule.forChild([{ path: '', component: ProPage }])
  ],
  declarations: [ProPage]
})
export class ProPageModule {}
