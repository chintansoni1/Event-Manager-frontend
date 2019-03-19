import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventInviteListComponent } from './event-invite-list.component';

describe('EventInviteListComponent', () => {
  let component: EventInviteListComponent;
  let fixture: ComponentFixture<EventInviteListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventInviteListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventInviteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
