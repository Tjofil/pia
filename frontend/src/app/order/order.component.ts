import { Component, Input, OnInit, Inject } from '@angular/core';
import { Category, EditCategory } from '../models/category';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  @Input() company: Company;

  newCategory: string;
  newSubCategory: string;
  message: string = '';
  expansionMode: boolean = false;
  expandingCategories: Category[] = [];


  edited: EditCategory = null;

  constructor(private companyService: CompanyService, public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  onCategorySelected(category) {
    if (this.beingEdited(category)) {
      return;
    }
    if (this.expandingCategories.includes(category)) {
      let index = this.expandingCategories.indexOf(category);
      this.expandingCategories.splice(index, 1);
      return;
    }
    this.expandingCategories.push(category);
  }

  createCategory() {
    let categoryToAdd = new Category('', this.newCategory);
    this.company.categories.push(categoryToAdd);
    this.companyService.update(this.company).subscribe((response) => {
      if (response['status'] != 'updated') {
        this.message = response['status'];
      }
    })
  }

  removeCategory(victim) {
    this.company.categories.forEach(category => {
      if (category.name == victim.name || category.parent == victim.name) {
        let victimIndex = this.company.categories.indexOf(category);
        this.company.categories.splice(victimIndex, 1);
      }
    });
    this.companyService.update(this.company).subscribe((response) => {
      if (response['status'] != 'updated') {
        this.message = response['status'];
      }
    })
  }

  editCategory(cat, event) {
    event.stopPropagation();
    this.edited = new EditCategory(cat.parent, cat.name);
  }

  openSubCreation(superCategory, event) {
    if (this.expandingCategories.includes(superCategory)) {
      event.stopPropagation();
    }
    this.edited = new EditCategory(superCategory.name, '')
    this.company.categories.push(new Category(superCategory.name, ''))
  }



  confirmEdit(editee, event) {
    event.stopPropagation();
    this.company.categories.forEach(category => {
      if (category.parent == this.edited.oldName && category.parent != '') {
        category.parent = this.edited.name;
      }
    });
    editee.name = this.edited.name;
    this.companyService.update(this.company).subscribe((response) => {
      if (response['status'] != 'updated') {
        this.message = response['status'];
      }
    })
    this.edited = null;
  }

  beingEdited(category) {
    return this.edited && this.edited.oldName == category.name
  }

  appointProduct(category, event) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(DialogComponent, {
      height: '700px',
      width: '1000px',
      data: { company: this.company, category: category },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }


}
