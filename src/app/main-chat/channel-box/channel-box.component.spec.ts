import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelBoxComponent } from './channel-box.component';

describe('ChannelBoxComponent', () => {
  let component: ChannelBoxComponent;
  let fixture: ComponentFixture<ChannelBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChannelBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChannelBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
