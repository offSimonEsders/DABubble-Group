import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReactionComponent } from './edit-reaction.component';

describe('EditReactionComponent', () => {
  let component: EditReactionComponent;
  let fixture: ComponentFixture<EditReactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditReactionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
