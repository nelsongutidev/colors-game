import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxesService } from '../boxes/boxes.service';
import { Option } from '../../models/models';

@Component({
  selector: 'app-color-options',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for(option of availableOptions(); track option) {
    <button
      class="w-8 h-8 border-2 rounded-full "
      [style.backgroundColor]="option.color"
      (click)="onSelection(option)"
      [style.opacity]="option.disabled ? 0.1 : 1"
      [disabled]="option.disabled"
    ></button
    >}
  `,
  host: {
    class: 'flex flex-wrap flex-row justify-center items-center ',
  },
})
export class ColorOptionsComponent {
  @Input() boxIndex!: number;
  protected readonly boxesService = inject(BoxesService);
  protected readonly boxes = this.boxesService.boxes;
  protected readonly options = this.boxesService.options;
  protected readonly availableOptions = this.boxesService.availableOptions;

  onSelection(option: Option) {
    this.boxesService.onOptionSelect(this.boxIndex, option);
  }
}
