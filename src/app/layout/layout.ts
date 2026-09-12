import { Component } from '@angular/core';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { Main } from './main/main';

@Component({
  selector: 'app-layout',
  imports: [Header, Footer, Main],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {}
