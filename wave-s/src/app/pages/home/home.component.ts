import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  styleUrls: ['https://fonts.googleapis.com/css?family=Inter%3A400%2C500%2C600%2C800',
    './home.component.css',
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro%3A400%2C500%2C600%2C800'
  ]
})

export class HomeComponent {

}
