import { trigger, transition, style, animate, state } from '@angular/animations';

export let fade = trigger('fade', [

  state('void', style({ opacity: 0 })),

  transition(':enter, :leave', [
    animate(1000)
  ]),
]);

export let slideRight = trigger('slideRight', [
  state('void', style({ transform: 'translateX(2000px)' })),

  transition(':enter, :leave', [
    animate(1000)
  ])
]);

export let slideDown = trigger('slideDown', [
  state('void', style({ transform: 'translateY(-1000px)' })),

  transition(':enter, :leave', [
    animate(1000)
  ])
]);

