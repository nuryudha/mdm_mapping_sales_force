import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahMappingSalesComponent } from './tambah-mapping-sales.component';

describe('TambahMappingSalesComponent', () => {
  let component: TambahMappingSalesComponent;
  let fixture: ComponentFixture<TambahMappingSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TambahMappingSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahMappingSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
