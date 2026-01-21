import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBanknotes, heroPower, heroUser, heroWrenchScrewdriver } from '@ng-icons/heroicons/outline';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [NgIcon, RouterLink, RouterLinkActive],
  providers: provideIcons({heroBanknotes, heroPower, heroUser, heroWrenchScrewdriver}),
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {


}
