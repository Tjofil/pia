import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReceiptsComponent } from './user-receipts.component';

describe('UserReceiptsComponent', () => {
  let component: UserReceiptsComponent;
  let fixture: ComponentFixture<UserReceiptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserReceiptsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
