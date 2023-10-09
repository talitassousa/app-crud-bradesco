import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css'],
})
export class CursoComponent {
  constructor(
    private CursoService: CursoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
}
