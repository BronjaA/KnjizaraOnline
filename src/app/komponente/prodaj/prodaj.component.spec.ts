import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdajComponent } from './prodaj.component';

describe('ProdajComponent', () => {
  let component: ProdajComponent;
  let fixture: ComponentFixture<ProdajComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdajComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
