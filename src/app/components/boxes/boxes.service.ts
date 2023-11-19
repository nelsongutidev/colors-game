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

  answers = signal(['#FFD700', '#7C0A02', '#00457C', '#008000', '#FFA500']);
  isCorrectCombination = computed(() => {
    const allColorsCorrect = this.boxes()
      .map(({ color }, index) => color === this.answers()[index])
      .every((i) => i);

    return allColorsCorrect;
  });

  selectOption(boxIndex: number, option: any) {
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
