import { trigger, transition, style, animate } from "@angular/animations";

export const slideAnimation = 
    trigger('fade', [
      transition(':enter', [
        style({transform: 'translateX(10px)'}),
        animate(200)
      ]),
      transition(':leave', [
        animate(1000, style({transform: 'translateX(90px)', opacity: 0}))
      ])
    ])