import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Components } from "./components/components";
import { Pages } from "./pages/pages";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Components, Pages],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portifolio');
}
