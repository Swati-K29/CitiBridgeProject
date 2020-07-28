import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/app/view-modules/navbar/navbar.component';
import { SidebarComponent } from 'src/app/view-modules/sidebar/sidebar.component';
import { FooterComponent } from 'src/app/view-modules/footer/footer.component';
import { DashboardComponent } from 'src/app/view-modules/dashboard/dashboard.component';
import { LoginComponent } from './login/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {MatCardModule,MatTabsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatCheckboxModule,MatIconModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { UploadFileComponent } from 'src/app/view-modules/upload-file/upload-file/upload-file.component';
import { UploadService } from 'src/app/services/upload.service';
import { LoginService } from "src/app/services/login.service";
import { TransactionService } from 'src/app/services/transaction.service';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageService } from 'primeng';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    UploadFileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    MultiSelectModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTableModule
  ],
  providers: [UploadService,LoginService, TransactionService , MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }