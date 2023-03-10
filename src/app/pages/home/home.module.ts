import { ComponentsModule } from './../../@core/components/components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from '../home/home.component';
import { CreateAccountComponent } from '../../pages/home/create-account/create-account.component';
import { RemoveTransactionComponent } from './remove-transaction/remove-transaction';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { CreateColumnComponent } from './create-column/create-column.component';
import {MatSelectModule} from '@angular/material/select'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { RemoveAccountComponent } from './remove-account/remove-account.component';
@NgModule({
  declarations: [
    HomeComponent,
    CreateAccountComponent,
    EditAccountComponent,
    CreateColumnComponent,
    RemoveTransactionComponent,
    RemoveAccountComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatExpansionModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
})
export class HomeModule {}
