import { Component } from '@angular/core';
import { HeroComponent } from '../../sections/hero/hero';
import { FeaturesComponent } from '../../sections/features/features';
import { DemoComponent } from '../../sections/demo/demo';
import { InstallComponent } from '../../sections/install/install';
import { FooterComponent } from '../../layout/footer/footer';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeroComponent, FeaturesComponent, DemoComponent, InstallComponent, FooterComponent],
  template: `
    <app-hero />
    <app-features />
    <app-demo />
    <app-install />
    <app-footer />
  `
})
export class HomePageComponent {}
