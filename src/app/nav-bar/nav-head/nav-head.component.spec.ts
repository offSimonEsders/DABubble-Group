import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavHeadComponent } from './nav-head.component';

describe('NavHeadComponent', () => {
  let component: NavHeadComponent;
  let fixture: ComponentFixture<NavHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavHeadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
