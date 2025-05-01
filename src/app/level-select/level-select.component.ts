import { Component }       from '@angular/core';
import { Router }          from '@angular/router';
import { CommonModule }    from '@angular/common';
import { RouterLink }      from '@angular/router';
import { RouterLinkActive }from '@angular/router';

@Component({
  selector: 'app-level-select',
  standalone: true,
  imports: [ CommonModule, RouterLink, RouterLinkActive ],
  templateUrl: './level-select.component.html',
  styleUrls: ['./level-select.component.css']
})
export class LevelSelectComponent {
  levels = ['Level 1', 'Level 2', 'Level 3', 'Level 4'];

  constructor(private router: Router) {}

  select(level: string) {
    // بعد ما يختار يروح للشاشة اللي بعدها، مثلاً QR
    this.router.navigate(['/qr'], { queryParams: { level } });
  }

  back() {
    this.router.navigate(['/signup']);
  }
}
