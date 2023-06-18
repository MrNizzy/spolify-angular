import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerPerfilComponent } from './banner-perfil.component';

describe('BannerPerfilComponent', () => {
  let component: BannerPerfilComponent;
  let fixture: ComponentFixture<BannerPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
