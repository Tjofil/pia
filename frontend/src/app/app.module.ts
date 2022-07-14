import { NgModule, ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from "@angular/material/button";
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { CompanyComponent } from './company/company.component';
import { MatTableModule } from '@angular/material/table';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductServicesComponent } from './product-services/product-services.component';

import { RegisterComponent } from './register/register.component';
import { CustomerComponent } from './customer/customer.component';
import { OrderComponent } from './order/order.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { TablesComponent } from './tables/tables.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TableDialogComponent } from './table-dialog/table-dialog.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { ReceiptDialogComponent } from './receipt-dialog/receipt-dialog.component';
import { TableChooseDialogComponent } from './table-choose-dialog/table-choose-dialog.component';
import { ReportComponent } from './report/report.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { CompanyInfoDialogComponent } from './company-info-dialog/company-info-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddUserComponent } from './add-user/add-user.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { UserReceiptsComponent } from './user-receipts/user-receipts.component';
import { ExpenditureComponent } from './expenditure/expenditure.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TesterComponent } from './tester/tester.component';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { MatSliderModule } from '@angular/material/slider';
import { AreYouSureComponent } from './are-you-sure/are-you-sure.component';




@NgModule({
  declarations: [
    AppComponent,
    CompanyComponent,
    HomeComponent,
    ProductServicesComponent,
    AddProductComponent,
    RegisterComponent,
    CustomerComponent,
    OrderComponent,
    DialogComponent,
    TablesComponent,
    TableDialogComponent,
    ReceiptComponent,
    ReceiptDialogComponent,
    TableChooseDialogComponent,
    ReportComponent,
    AdminComponent,
    AdminPanelComponent,
    CompanyInfoDialogComponent,
    AddUserComponent,
    UserPanelComponent,
    ArticleDetailsComponent,
    UserReceiptsComponent,
    ExpenditureComponent,
    TesterComponent,
    PassChangeComponent,
    AreYouSureComponent
  ],
  imports: [
    AppRoutingModule,
    AppRoutingModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    MatChipsModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatRadioModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatTableModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTreeModule,
    MatDialogModule,
    BrowserModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxChartsModule,
    MatSliderModule,
    MatTooltipModule

  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
