import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSalesForceComponent } from './job-sales-force.component';

describe('JobSalesForceComponent', () => {
  let component: JobSalesForceComponent;
  let fixture: ComponentFixture<JobSalesForceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobSalesForceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobSalesForceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
