import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubredditsFormComponent } from './subreddits-form.component';

describe('SubredditsFormComponent', () => {
  let component: SubredditsFormComponent;
  let fixture: ComponentFixture<SubredditsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubredditsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubredditsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
