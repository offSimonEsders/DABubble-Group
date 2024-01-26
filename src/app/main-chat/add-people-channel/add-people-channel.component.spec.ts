import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeopleChannelComponent } from './add-people-channel.component';

describe('AddPeopleChannelComponent', () => {
  let component: AddPeopleChannelComponent;
  let fixture: ComponentFixture<AddPeopleChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPeopleChannelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddPeopleChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
