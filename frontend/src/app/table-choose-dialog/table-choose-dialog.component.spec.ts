import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChooseDialogComponent } from './table-choose-dialog.component';

describe('TableChooseDialogComponent', () => {
  let component: TableChooseDialogComponent;
  let fixture: ComponentFixture<TableChooseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableChooseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableChooseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
