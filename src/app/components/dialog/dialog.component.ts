import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoxesService } from '../boxes/boxes.service';
import { Dialog } from '@angular/cdk/dialog';

const COLOR_MAP = {
  '#008000': '🟢',
  '#FFD700': '🟡',
  '#7C0A02': '🔴',
  '#FFA500': '🟠',
  '#00457C': '🔵',
};

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="flex flex-col space-y-4 items-center justify-center ">
      <h2 class="text-3xl">You win! 🎉</h2>
      <p>You completed the game in {{ attempts() }} attempts!</p>
      <div class="flex gap-2">
        @for(color of answer(); track color) {
        <div class="">
          <div
            class="w-8 h-8 md:h-8 border rounded-lg "
            [style.backgroundColor]="color"
          ></div>
        </div>

        }
      </div>

      <div class="flex gap-2 ">
        <button (click)="closeDialog()" class="btn border">Play again!</button>
        <!-- <a target="_blank" class="btn border" [href]="text"
          ><span>Share on X</span></a
        > -->
      </div>
    </section>
  `,

  host: {
    class: 'block bg-white rounded-lg p-8',
  },
})
export class DialogComponent {
  dialog = inject(Dialog);
  boxesService = inject(BoxesService);
  answer = this.boxesService.answer;
  attempts = this.boxesService.attempts;
  answerEmojis = computed(() => {
    return this.answer()
      .map((color: string) => COLOR_MAP[color as keyof typeof COLOR_MAP])
      .join('');
  });
  text =
    'https://twitter.com/intent/tweet?text=' +
    encodeURIComponent(
      `I just solved the COLORS game in ${this.attempts()} attempts!  \n ${this.answerEmojis()} \n\n  Give it a try at`
    ) +
    '&url=' +
    encodeURIComponent('https://ng-colors.netlify.app/');

  encodeURIComponent = encodeURIComponent;

  closeDialog() {
    this.dialog.closeAll();
  }
}
