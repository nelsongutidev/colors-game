import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { OPTIONS, BOXES_INITIAL_STATE } from './constants';
import { shuffleArray } from '../../utils/utils';
import { Option, SubmittedAnswer } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class BoxesService {
  boxes = signal(BOXES_INITIAL_STATE);
  options = signal(OPTIONS);
  sumbittedAnswers: WritableSignal<SubmittedAnswer[]> = signal([]);
  isGameCompleted = computed(() =>
    this.sumbittedAnswers()
      .map((answer) => answer.correctAnswers)
      .some((correctAnswers) => correctAnswers === 5)
  );
  attempts = computed(() => this.sumbittedAnswers().length);
  answer = signal(
    shuffleArray(['#008000', '#FFD700', '#7C0A02', '#FFA500', '#00457C'])
  );

  isReadyToSubmit = computed(() => {
    return !this.boxes().every((box) => box.color);
  });

  availableOptions = computed(() => {
    const selectedColors = this.boxes().map((box) => box.color);
    return this.options().map((option) => {
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
    this.boxes.update((boxes) => {
      return boxes.map((box) => {
        return {
          ...box,
          color: '',
        };
      });
    });
  }

  private resetOptions() {
    this.options.update((option) => {
      return option.map((option) => {
        return {
          ...option,
          disabled: false,
        };
      });
    });
  }

  resetGame() {
    this.answer.set(
      shuffleArray(['#008000', '#FFD700', '#7C0A02', '#FFA500', '#00457C'])
    );
    this.resetBoxes();
    this.resetOptions();
    this.sumbittedAnswers.update(() => []);
  }

  onOptionSelect(boxIndex: number, option: Option) {
    this.boxes.update((boxes) => {
      boxes[boxIndex].color = option.color;
      return [...boxes];
    });
  }

  onBoxSelection(selectedIndex: number) {
    this.boxes.update((boxes) => {
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

    this.sumbittedAnswers.update((submittedAnswers) => {
      const submission = {
        correctAnswers,
        submitted,
      };
      submittedAnswers.push(submission);

      return [...submittedAnswers];
    });

    this.resetBoxes();
    this.resetOptions();
  }
}
