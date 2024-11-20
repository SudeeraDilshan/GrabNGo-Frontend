import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryViewAdminComponent } from './category-view-admin.component';

describe('CategoryViewAdminComponent', () => {
  let component: CategoryViewAdminComponent;
  let fixture: ComponentFixture<CategoryViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryViewAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
