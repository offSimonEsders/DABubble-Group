import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileViewMemberComponent } from './profile-view-member.component';

describe('ProfileViewMemberComponent', () => {
  let component: ProfileViewMemberComponent;
  let fixture: ComponentFixture<ProfileViewMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileViewMemberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileViewMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
