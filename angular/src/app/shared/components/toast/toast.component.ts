import { Component } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'app-toast',
  imports: [NgbToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}
}
