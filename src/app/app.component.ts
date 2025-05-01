import { Component }      from '@angular/core';
import { RouterOutlet }   from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';

// لو عايز تستخدم حاجة تانيّة زي CommonModule أو FormsModule ضيفها هنا في الـ imports

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ NavbarComponent, RouterOutlet, ],
  template: `
    <app-navbar></app-navbar>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // هنا ممكن تحط logic عام لو حبيت
}
