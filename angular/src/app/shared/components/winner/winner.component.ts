import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WinnerService } from '../../../services/winner/winner.service';

@Component({
  selector: 'app-winner',
  imports: [],
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.css',
})
export class WinnerComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  winnerName: string = '';

  constructor(private winnerService: WinnerService) {}

  ngAfterViewInit(): void {
    this.winnerService.createInstance(this.canvas);
  }

  celebrate() {
    this.winnerService.launchConfetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.5 },
    });
  }

  selectWinner() {
    this.winnerService.selectWinner().subscribe({
      next: (data) => {
        this.winnerName = `${data.winner.name} ${data.winner.last_name}`;
        console.log('Winner selected successfully', data);
      },
      error: (error) => {
        console.error('Error selecting winner:', error);
      },
    });
  }
}
