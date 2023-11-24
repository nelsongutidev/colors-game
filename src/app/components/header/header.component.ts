import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header class="flex flex-col items-center justify-center mt-8">
      <h1 class="text-4xl text-center  ">Colors</h1>
      <svg width="100" height="20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="5" fill="#00457C" />
        <circle cx="30" cy="10" r="5" fill="#008000" />
        <circle cx="50" cy="10" r="5" fill="#FFD700" />
        <circle cx="70" cy="10" r="5" fill="#7C0A02" />
        <circle cx="90" cy="10" r="5" fill="#FFA500" />
      </svg>
    </header>
  `,
})
export class HeaderComponent {}
