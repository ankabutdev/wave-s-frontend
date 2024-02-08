import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { ProductService } from '../../../services/prodcuts/product.service';

interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}


@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})

export class PaginatorComponent {
  @Input() first: number = 0;
  @Input() rows: number = 9;
  @Input() totalRecords!: number;
  @Output() onPageChange: EventEmitter<{ first: number, rows: number }> = new EventEmitter();

  constructor() { }

  onPageChanged(event: any) {
    this.onPageChange.emit({ first: event.first, rows: event.rows });
  }
}
