import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OPTIONS } from '../boxes/initialState';
import { BoxesService } from '../boxes/boxes.service';

@Component({
  selector: 'app-color-options',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for(option of availableOptions(); track option.value) {
    <button
      class="w-1/5 h-8 border-2 rounded-lg "
      [style.backgroundColor]="option.color"
      (click)="onSelection(option, $index)"
      [style.opacity]="option.disabled ? 0.1 : 1"
      [disabled]="option.disabled"
    ></button
    >}
  `,
  styles: ``,
})
export class ColorOptionsComponent {
  @Input() boxIndex!: number;
  boxesService = inject(BoxesService);
  boxes = this.boxesService.boxes;
  options = this.boxesService.options;
  availableOptions = this.boxesService.availableOptions;

  onSelection(option: any, selectedIndex: number) {
    console.log('option: ', option);
    this.boxesService.selectOption(this.boxIndex, option);
  }
}
