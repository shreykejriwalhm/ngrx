import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

@NgModule({
    imports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule],
    exports: [CommonModule, FormsModule, MaterialModule, FlexLayoutModule]
})
export class SharedModule { }