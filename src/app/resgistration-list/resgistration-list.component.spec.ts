import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgistrationListComponent } from './resgistration-list.component';

describe('ResgistrationListComponent', () => {
  let component: ResgistrationListComponent;
  let fixture: ComponentFixture<ResgistrationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResgistrationListComponent]
    });
    fixture = TestBed.createComponent(ResgistrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
