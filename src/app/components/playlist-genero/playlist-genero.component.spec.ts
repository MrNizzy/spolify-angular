import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistGeneroComponent } from './playlist-genero.component';

describe('PlaylistGeneroComponent', () => {
  let component: PlaylistGeneroComponent;
  let fixture: ComponentFixture<PlaylistGeneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaylistGeneroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
