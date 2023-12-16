import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentChatIntroComponent } from './current-chat-intro.component';

describe('CurrentChatIntroComponent', () => {
  let component: CurrentChatIntroComponent;
  let fixture: ComponentFixture<CurrentChatIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentChatIntroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentChatIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
