import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseACharacterComponent } from './choose-acharacter.component';

describe('ChooseACharacterComponent', () => {
  let component: ChooseACharacterComponent;
  let fixture: ComponentFixture<ChooseACharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseACharacterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseACharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
