import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BOXES, OPTIONS } from './initialState';
import { ColorOptionsComponent } from '../color-options/color-options.component';
import { BoxesService } from './boxes.service';

@Component({
  selector: 'app-boxes',
  standalone: true,
  template: `
    <main>
      <h1 class="text-2xl text-center">Color Game</h1>
      <div class="flex flex-col my-4">
        @for(submitAnswer of submittedAnswers(); track submitAnswer) {
        <div class="flex justify-center gap-2">
          @for(item of submitAnswer.submitted; track item) {
          <div class="flex flex-col">
            <div
              class="w-12 h-12 border rounded-lg "
              [style.backgroundColor]="item.color"
              (click)="onBoxSelection(item, $index)"
            ></div>
          </div>

          }
          <div>Correct Anssers: {{ submitAnswer.correctAnswers }}</div>
        </div>

        }
      </div>

      <div class="flex gap-4 items-center">
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

        <button
          [disabled]="isReadyToSubmit()"
          class="btn btn-blue"
          (click)="submitAnswer()"
        >
          Submit
        </button>
      </div>
    </main>
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
  submittedAnswers = this.boxesService.sumbittedAnswers;
  isReadyToSubmit = this.boxesService.isReadyToSubmit;

  onBoxSelection(box: any, selectedIndex: number) {
    this.boxesService.onBoxSelection(box, selectedIndex);
  }

  submitAnswer() {
    this.boxesService.onSubmitAnswer();
  }
}
