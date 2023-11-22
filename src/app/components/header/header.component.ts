import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <h1 class="text-2xl md:text-4xl text-center mt-8">Color Game</h1>
  `,
})
export class HeaderComponent {}
