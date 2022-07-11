import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompanyComponent } from './company/company.component';
import { ProductServicesComponent } from './product-services/product-services.component';
import { OrderComponent } from './order/order.component';
import { TablesComponent } from './tables/tables.component';
import { AdminComponent } from './admin/admin.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { TesterComponent } from './tester/tester.component';

const routes: Routes = [

  {
    path: '', component: HomeComponent
  },
  {
    path: 'company', component: CompanyComponent
  },
  {
    path: 'services', component: ProductServicesComponent
  },
  { path: 'order', component: OrderComponent },
  {
    path: 'tables', component: TablesComponent
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'admin-panel', component: AdminPanelComponent
  },
  {
    path: 'user-panel', component: UserPanelComponent
  },
  {
    path: 'test', component: TesterComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
