import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorOptionsComponent } from '../color-options/color-options.component';
import { BoxesService } from './boxes.service';
import { SvgCorrectIconComponent } from '../svg-correct-icon/svg-correct-icon.component';
import { SvgIncorrectIconComponent } from '../svg-incorrect-icon/svg-incorrect-icon.component';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-boxes',
  standalone: true,
  template: `
    <section>
      <div class="flex flex-col my-4">
        @for(submitAnswer of submittedAnswers(); track submitAnswer) {
        <div class="flex justify-center gap-2">
          @for(item of submitAnswer.submitted; track item) {
          <div class="flex flex-col">
            <div
              class="w-8 h-8 md:h-8 border rounded-lg "
              [style.backgroundColor]="item.color"
              (click)="onBoxSelection($index)"
            ></div>
          </div>

          }
          <div class="flex items-center gap-2">
            <!-- @for(item of Array(submitAnswer.correctAnswers); track item) {
            <app-svg-correct-icon />
            } @for(item of Array(5 -submitAnswer.correctAnswers); track item) {
            <app-svg-incorrect-icon />
            } -->

            <span class="inline-flex items-center justify-center"
              >{{ submitAnswer.correctAnswers }} <app-svg-correct-icon />
            </span>

            <span class="inline-flex items-center justify-center"
              >{{ 5 - submitAnswer.correctAnswers }} <app-svg-incorrect-icon
            /></span>
          </div>
        </div>
        <div class="flex justify-center">
          <hr class="my-2 w-64" />
        </div>

        }
      </div>

      <div
        class="flex gap-1 sm:gap-2 md:gap-4 items-center  justify-center mx-2 sm:mx-4 mt-8"
      >
        @for (item of boxes(); track item.id) {
        <div class="flex flex-col items-center">
          <div
            class="w-full h-16 lg:h-40 lg:w-40  sm:h-32 border-2 rounded-lg"
            [style.backgroundColor]="item.color"
            (click)="onBoxSelection($index)"
          ></div>
          <app-color-options class="my-2" [boxIndex]="$index" />
        </div>

        }
      </div>

      <div class="flex justify-center my-4">
        <button
          [disabled]="isReadyToSubmit()"
          class="btn btn-blue "
          (click)="submitAnswer()"
        >
          Submit
        </button>
      </div>
    </section>
  `,
  host: {
    class:
      'flex flex-wrap gap-4 justify-center items-center mt-4 h-full content-start',
  },
  imports: [
    CommonModule,
    ColorOptionsComponent,
    SvgCorrectIconComponent,
    SvgIncorrectIconComponent,
    DialogModule,
  ],
})
export class BoxesComponent {
  private readonly dialog = inject(Dialog);
  private readonly boxesService = inject(BoxesService);
  protected readonly boxes = this.boxesService.boxes;
  protected readonly options = this.boxesService.options;
  protected readonly submittedAnswers = this.boxesService.submittedAnswers;
  isReadyToSubmit = this.boxesService.isReadyToSubmit;
  Array = Array;

  onBoxSelection(selectedIndex: number) {
    this.boxesService.onBoxSelection(selectedIndex);
  }

  submitAnswer() {
    this.boxesService.onSubmitAnswer();

    if (this.boxesService.isGameCompleted()) {
      this.dialog
        .open(DialogComponent, {
          minWidth: '300px',
        })
        .closed.subscribe(() => {
          this.boxesService.resetGame();
        });
    }
  }
}
