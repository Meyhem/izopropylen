import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.sass']
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  destroyed$: Subject<void>;
  projectId: Observable<string>;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.destroyed$ = new Subject();
    this.projectId = route.params.pipe(
      takeUntil(this.destroyed$),
      map(p => p.id as string)
    );
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
