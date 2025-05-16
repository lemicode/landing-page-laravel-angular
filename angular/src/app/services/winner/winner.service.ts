import { Injectable, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import confetti, { CreateTypes } from 'canvas-confetti';

@Injectable({
  providedIn: 'root',
})
export class WinnerService {
  private confettiInstance: CreateTypes | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Creates a confetti instance on a specific canvas
   */
  createInstance(canvas: ElementRef<HTMLCanvasElement>) {
    this.confettiInstance = confetti.create(canvas.nativeElement, {
      resize: true,
      useWorker: true,
    });
  }

  randomInRange(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  fireworks() {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var interval = setInterval(() => {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: this.randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: this.randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  launchConfetti(options: any = {}) {
    if (this.confettiInstance) {
      this.confettiInstance({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.5 },
        ...options,
      });
    } else {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.5 },
        ...options,
      });
    }
  }

  selectWinner(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/customers/winner`);
  }
}
