import { Component } from '@angular/core';
import { WinnerService } from '../../../services/winner/winner.service';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-winner',
  imports: [],
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.css',
})
export class WinnerComponent {
  winnerName: string | null = null;
  _customerTotal: number = 0;

  constructor(private winnerService: WinnerService) {}

  selectWinner() {
    this.winnerService.selectWinner().subscribe({
      next: (data) => {
        this._customerTotal = data.customerTotal;
        if (data.winner) {
          this.winnerName = `${data.winner.name} ${data.winner.last_name}`;
          this.celebrate();
          console.log('Winner selected successfully', data);
        }
      },
      error: (error) => {
        console.error('Error selecting winner:', error);
      },
    });
  }

  get customerTotal() {
    return this._customerTotal;
  }

  celebrate() {
    const duration = 3000;

    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 150,
        spread: 180,
        origin: { y: 0.6 },
        colors: ['#FF4500', '#008080', '#FFD700'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }
}
