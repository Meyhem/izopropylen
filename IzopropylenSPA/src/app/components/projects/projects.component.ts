import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { State, ProjectMembership, selectProjectMemberships } from 'src/app/reducers';
import { FetchProjectMemberships } from 'src/app/actions/project-actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.sass']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  destroyed$: Subject<void>;
  memberships$: Observable<ProjectMembership[]>;

  constructor(private store: Store<State>) {
    this.destroyed$ = new Subject();
    this.memberships$ = store.select(selectProjectMemberships())
      .pipe(takeUntil(this.destroyed$));
  }

  ngOnInit() {
    this.store.dispatch(FetchProjectMemberships.begin());
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
