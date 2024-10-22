import { Injectable, WritableSignal, computed, signal } from '@angular/core';
import { OPTIONS, BOXES_INITIAL_STATE } from './constants';
import { shuffleArray } from '../../utils/utils';
import { Option, SubmittedAnswer } from '../../models/models';

@Injectable({
  providedIn: 'root',
})
export class BoxesService {
  private _boxes = signal(BOXES_INITIAL_STATE);
  private _submittedAnswers: WritableSignal<SubmittedAnswer[]> = signal([]);
  private _answer = signal(
    shuffleArray(['#008000', '#FFD700', '#7C0A02', '#FFA500', '#00457C'])
  );
  public readonly options = signal(OPTIONS);
  public readonly boxes = this._boxes.asReadonly();
  public readonly submittedAnswers = this._submittedAnswers.asReadonly();
  public readonly isGameCompleted = computed(() =>
    this.submittedAnswers()
      .map((answer) => answer.correctAnswers)
      .some((correctAnswers) => correctAnswers === 5)
  );
  public readonly attempts = computed(() => this.submittedAnswers().length);
  public readonly answer = this._answer.asReadonly();

  public readonly isReadyToSubmit = computed(() => {
    return !this._boxes().every((box) => box.color);
  });

  public readonly availableOptions = computed(() => {
    const selectedColors = this._boxes().map((box) => box.color);
    return this.options().map((option) => {
      const isDisabled = selectedColors.includes(option.color);
      return {
        ...option,
        disabled: isDisabled,
      };
    });
  });

  readonly isCorrectCombination = computed(() => {
    const allColorsCorrect = this._boxes()
      .map(({ color }, index) => color === this.answer()[index])
      .every((i) => i);

    return allColorsCorrect;
  });

  private resetBoxes() {
    this._boxes.update((boxes) => {
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
    this._answer.set(
      shuffleArray(['#008000', '#FFD700', '#7C0A02', '#FFA500', '#00457C'])
    );
    this.resetBoxes();
    this.resetOptions();
    this._submittedAnswers.update(() => []);
  }

  onOptionSelect(boxIndex: number, option: Option) {
    this._boxes.update((boxes) => {
      boxes[boxIndex].color = option.color;
      return [...boxes];
    });
  }

  onBoxSelection(selectedIndex: number) {
    this._boxes.update((boxes) => {
      if (boxes[selectedIndex].color) {
        boxes[selectedIndex].color = '';
        return [...boxes];
      }
      return [...boxes];
    });
  }

  onSubmitAnswer() {
    const submitted = this._boxes();
    const correctAnswers = this._boxes()
      .map(({ color }, index) => color === this.answer()[index])
      .filter(Boolean).length;

    this._submittedAnswers.update((submittedAnswers) => {
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
