import { Injectable, computed, signal } from '@angular/core';
import { BOXES, OPTIONS } from './initialState';

@Injectable({
  providedIn: 'root',
})
export class BoxesService {
  boxes = signal(BOXES);
  options = signal(OPTIONS);
  availableOptions = computed(() => {
    const selectedColors = this.boxes().map((box: any) => box.color);
    return this.options().map((option: any) => {
      const isDisabled = selectedColors.includes(option.color);
      return {
        ...option,
        disabled: isDisabled,
      };
    });
  });

  selectOption(boxIndex: number, option: any) {
    console.log('option: ', option);
    console.log('boxIndex: ', boxIndex);
    this.boxes.update((boxes): any => {
      // if (boxes[boxIndex].color) {
      //   boxes[boxIndex].color = '';
      //   boxes[boxIndex].value = '';
      // }
      boxes[boxIndex].color = option.color;
      boxes[boxIndex].value = option.value;
      return [...boxes];
    });
  }

  onBoxSelection(box: any, selectedIndex: number) {
    this.boxes.update((boxes): any => {
      if (boxes[selectedIndex].color) {
        boxes[selectedIndex].color = '';
        boxes[selectedIndex].value = '';
        return [...boxes];
      }
      return [...boxes];
    });
  }
}
