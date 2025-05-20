import { Injectable, TemplateRef } from '@angular/core';

export interface ToastInfo {
  className: string;
  body: string;
  delay: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: ToastInfo[] = [];

  show(body: string, className: string, delay: number): void {
    this.toasts.push({ body, className, delay });
  }

  remove(toast: ToastInfo): void {
    this.toasts = this.toasts.filter((t) => t != toast);
  }
}
