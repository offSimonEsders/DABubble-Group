import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMailForResetPasswordComponent } from './send-mail-for-reset-password.component';

describe('SendMailForResetPasswordComponent', () => {
  let component: SendMailForResetPasswordComponent;
  let fixture: ComponentFixture<SendMailForResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendMailForResetPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendMailForResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
