import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {

  ngOnInit(): void {
    this.layerAnimation();

  }

  layerAnimation() {
    // gsap.from(".hero__article", { duration: 1.5, y: '50px', opacity: 0, delay: 0.5 });
    // gsap.from(".hero__img-container .main", { duration: 2, opacity: 0, delay: 0.5 });
    // gsap.from(".hero__img-container .sub", { duration: 1.5, y: '50px', opacity: 0, delay: 0.5 });


    // gsap.from(".hero__article", { duration: 1.5, y: '50px', opacity: 0, delay: 0.5 });
    // gsap.from(".hero__img-container .main", { duration: 2, opacity: 0, delay: 0.5 });
    // gsap.from(".hero__img-container .sub", { duration: 1.5, y: '50px', opacity: 0, delay: 0.5 });

    gsap.fromTo(".features__header",
      {
        y: '50px',
        opacity: 0,
      },
      {
        scrollTrigger: ".feature-management img",
        y: 0,
        delay: 0.5,
        opacity: 1,
        duration: 1.5
      }
    );

    gsap.fromTo(".feature-management div",
      {
        y: '50px',
        opacity: 0,
      },
      {
        scrollTrigger: ".feature-management img",
        y: 0,
        delay: 0.5,
        opacity: 1,
        duration: 1.5
      }
    );
    gsap.fromTo(".feature-analytics div",
      {
        y: '50px',
        opacity: 0,
      },
      {
        scrollTrigger: ".feature-analytics img",
        y: 0,
        delay: 0.5,
        opacity: 1,
        duration: 1.5
      }
    );


    gsap.timeline({
      scrollTrigger: {
        trigger: '.overlay-item',
        start: "top 120px",
        pin: true,
        pinSpacing: false,
        // markers: true,
        // end: "top -80vh",
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.overlay-item',
        start: "top 120px",
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        // markers: true,
        scrub: true,
        // toggleActions: "play none none reverse",
      },
    });
    tl.to('.total-container', { y: '-100%' })


  }

}
