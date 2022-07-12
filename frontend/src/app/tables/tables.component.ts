import { DragAxis, moveItemInArray, Point } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CashReg, Department } from '../models/cashReg';
import { Company } from '../models/company';
import { Table } from '../models/table';
import { CompanyService } from '../services/company.service';
import { TableDialogComponent } from '../table-dialog/table-dialog.component';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css']
})
export class TablesComponent implements OnInit {

  @Input() company: Company;
  @ViewChildren('div') divs: QueryList<ElementRef>
  @ViewChildren('containers') conts: QueryList<ElementRef>

  reg: CashReg;
  currTabIdx: number = 0;
  lastOk: Point[];
  message: string;
  condition: boolean = false;
  successUpdate: string = 'Распоред успешно сачуван.'

  newDepartment: string = '';

  constructor(private companyService: CompanyService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reg = this.company.cashRegs[0];
  }

  trackById = (i: number, table: Table) => table.id;

  onDrop(index) {
    let skip = 0;
    for (let i = 0; i < this.currTabIdx; ++i) {
      skip += this.reg.departments[i].tables.length;
    }
    let moving = this.divs.get(skip + index).nativeElement.getBoundingClientRect();
    let cont = this.conts.get(this.currTabIdx).nativeElement.getBoundingClientRect();
    let tables = this.reg.departments[this.currTabIdx].tables;

    for (let i = 0; i < tables.length; ++i) {
      if (i == index) continue;
      let div = this.divs.get(skip + i).nativeElement.getBoundingClientRect();
      if (moving.top <= div.bottom && moving.bottom >= div.top && moving.left <= div.right && moving.right >= div.left) {
        tables[index].pos = tables[index].lastOk;
        return;
      }
    }

    tables[index].pos = { x: (moving.x - cont.x - 2), y: (moving.y - cont.y - 2) };
  }

  addDepartment() {
    if (this.newDepartment == '') {
      this.message = 'Ново одељење мора имати име.';
      return;
    }
    if (this.reg.departments.filter((dept: Department) => dept.name == this.newDepartment).length) {
      this.message = 'Већ постоји одељење са задатим именом.'
      return;
    }
    let departmentToAdd = new Department();
    departmentToAdd.name = this.newDepartment;
    this.reg.departments.push(departmentToAdd);
    this.companyService.update(this.company).subscribe(response => {
      if (response['status'] == 'updated') {
        this.message = ''
      } else {
        this.message = response['status'];
      }
    })
  }

  onMove(index) {
    let skip = 0;
    for (let i = 0; i < this.currTabIdx; ++i) {
      skip += this.reg.departments[i].tables.length;
    }
    let moving = this.divs.get(skip + index).nativeElement.getBoundingClientRect();
    let cont = this.conts.get(this.currTabIdx).nativeElement.getBoundingClientRect();
    let tables = this.reg.departments[this.currTabIdx].tables;

    for (let i = 0; i < tables.length; ++i) {
      if (i == index) continue;
      let div = this.divs.get(skip + i).nativeElement.getBoundingClientRect();
      if (moving.top <= div.bottom && moving.bottom >= div.top && moving.left <= div.right && moving.right >= div.left) {
        return;
      }
    }

    tables[index].lastOk = { x: (moving.x - cont.x - 2), y: (moving.y - cont.y - 2) };
  }

  save() {
    this.companyService.update(this.company).subscribe(response => {
      if (response['status'] == 'updated') {
        this.message = this.successUpdate;
      } else {
        this.message = response['status'];
      }
    })
  }


  addTable() {
    if (this.reg.departments.length == 0) {
      this.message = 'Мора постојати одељење за додавање стола.'
      return;
    }
    const dialogRef = this.dialog.open(TableDialogComponent, {
      height: '310px',
      width: '650px',
      data: { location: this.reg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let skip = 0;
        for (let i = 0; i < this.currTabIdx; ++i) {
          skip += this.reg.departments[i].tables.length;
        }
        let tables = this.reg.departments[this.currTabIdx].tables;
        let cont = this.conts.get(this.currTabIdx).nativeElement.getBoundingClientRect();
        let moving = { top: cont.top, bottom: cont.top + result.radius, left: cont.left, right: cont.left + result.radius }

        for (let i = 0; i < tables.length; ++i) {
          let div = this.divs.get(skip + i).nativeElement.getBoundingClientRect();
          if (moving.top <= div.bottom && moving.bottom >= div.top && moving.left <= div.right && moving.right >= div.left) {
            this.message = 'Молим вас направите места за нови сто (горњи леви ћошак одељења).'
            return;
          }
        }
        let newTable = new Table(result.id, result.radius, result.round);
        this.reg.departments[this.currTabIdx].tables.push(newTable);
        this.message = ''
      }
    });

  }

  tabChanged(event) {
    this.currTabIdx = event.index;
  }




}
