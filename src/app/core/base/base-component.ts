import { OnDestroy, Directive } from "@angular/core";

import { Subject } from "rxjs";

@Directive()
export abstract class BaseComponent implements OnDestroy {
  private _destroy$: Subject<any>;

  get destroy$() {
    if (!this._destroy$) {
      // Perf optimization:
      // since this is likely used as base component everywhere
      // only construct a Subject instance if actually used
      this._destroy$ = new Subject();
    }
    return this._destroy$;
  }

  /**
   * Ensure that this is called if overridden!
   */
  ngOnDestroy() {
    if (this._destroy$) {
      this._destroy$.next(true);
      this._destroy$.complete();
    }
  }
}
