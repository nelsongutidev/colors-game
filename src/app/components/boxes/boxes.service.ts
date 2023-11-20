import { Injectable, computed, signal } from '@angular/core';
import { BOXES, OPTIONS } from './initialState';
import { shuffleArray } from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class BoxesService {
  boxes = signal(BOXES);
  options = signal(OPTIONS);
  sumbittedAnswers: any = signal([]);
  answer = signal(
    shuffleArray(['#008000', '#FFD700', '#7C0A02', '#FFA500', '#00457C'])
  ); //

  isReadyToSubmit = computed(() => {
    return !this.boxes().every((box: any) => box.color);
  });

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

  isCorrectCombination = computed(() => {
    const allColorsCorrect = this.boxes()
      .map(({ color }, index) => color === this.answer()[index])
      .every((i) => i);

    return allColorsCorrect;
  });

  private resetBoxes() {
    this.boxes.update((boxes: any) => {
      return boxes.map((box: any) => {
        return {
          ...box,
          color: '',
        };
      });
    });
  }

  private resetOptions() {
    this.options.update((option) => {
      return option.map((option: any) => {
        return {
          ...option,
          disabled: false,
        };
      });
    });
  }

  selectOption(boxIndex: number, option: any) {
    this.boxes.update((boxes): any => {
      boxes[boxIndex].color = option.color;

      return [...boxes];
    });
  }

  onBoxSelection(box: any, selectedIndex: number) {
    this.boxes.update((boxes): any => {
      if (boxes[selectedIndex].color) {
        boxes[selectedIndex].color = '';
        return [...boxes];
      }
      return [...boxes];
    });
  }

  onSubmitAnswer() {
    const submitted = this.boxes();
    const correctAnswers = this.boxes()
      .map(({ color }, index) => color === this.answer()[index])
      .filter(Boolean).length;

    this.sumbittedAnswers.update((submittedAnswers: any) => {
      const submission: any = {
        correctAnswers,
        submitted,
      };
      submittedAnswers.push(submission as any);

      return [...submittedAnswers];
    });

    this.resetBoxes();
    this.resetOptions();
  }
}
