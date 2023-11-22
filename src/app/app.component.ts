import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { BoxesComponent } from './components/boxes/boxes.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    BoxesComponent,
    HeaderComponent,
    FooterComponent,
  ],
  host: { class: 'flex flex-col h-screen' },
})
export class AppComponent {
  title = 'colors-game';
}
