import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerosPlaylistComponent } from './generos-playlist.component';

describe('GenerosPlaylistComponent', () => {
  let component: GenerosPlaylistComponent;
  let fixture: ComponentFixture<GenerosPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerosPlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerosPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
