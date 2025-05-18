import { Injectable, TemplateRef } from '@angular/core';

export interface ToastInfo {
  className: string;
  body: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: ToastInfo[] = [];

  show(body: string, className: string) {
    this.toasts.push({ body, className });
  }

  remove(toast: ToastInfo) {
    this.toasts = this.toasts.filter((t) => t != toast);
  }
}
