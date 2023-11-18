import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BOXES, OPTIONS } from './initialState';
import { ColorOptionsComponent } from '../color-options/color-options.component';
import { BoxesService } from './boxes.service';

@Component({
  selector: 'app-boxes',
  standalone: true,
  template: `
    @for (item of boxes(); track item.id) {
    <div class="flex flex-col">
      <div
        class="w-36 h-36 border-2 rounded-lg "
        [style.backgroundColor]="item.color"
        (click)="onBoxSelection(item, $index)"
      ></div>
      <app-color-options [boxIndex]="$index" />
    </div>

    }
  `,
  host: {
    class: 'flex flex-wrap gap-4 justify-center items-center mt-8 ',
  },
  imports: [CommonModule, ColorOptionsComponent],
})
export class BoxesComponent {
  boxesService = inject(BoxesService);
  boxes = this.boxesService.boxes;
  options = this.boxesService.options;

  onBoxSelection(box: any, selectedIndex: number) {
    this.boxesService.onBoxSelection(box, selectedIndex);
  }
}
