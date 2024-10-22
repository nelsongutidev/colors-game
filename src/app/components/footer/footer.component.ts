import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <p class="flex flex-wrap justify-center py-4 px-4">
      Made by
      <span class="mx-2">
        <a class="hover:cursor-pointer underline" href="http://nelsonguti.dev">
          nelsonguti.dev</a
        ></span
      >
      using Angular v.{{ VERSION.full }}
    </p>
  `,
})
export class FooterComponent {
  protected readonly VERSION = VERSION;
}
