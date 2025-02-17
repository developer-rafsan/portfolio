import gsap from "gsap";

export const closeNavigation = () => {
  const tl = gsap.timeline();
  tl.to(["#navigationbg2, #navigationbg1"], {
    duration: 1,
    height: "0",
    transformOrigin: "right top",
    stagger: {
      amount: 0.1,
    },
    ease: "power3.inOut",
  })
    .to("#navigation", {
      css: { display: "none" },
    })
    .to("body", {
      duration: 0.1,
      css: { overflowY: "scroll" },
      ease: "power3.inOut",
    });
};

export const openNavigation = () => {
  const tl = gsap.timeline();
  tl.to("body", {
    duration: 0.1,
    css: { overflowY: "hidden" },
    ease: "power3.out",
  })
    .to("#navigation", {
      css: { display: "block" },
    })
    .to(["#navigationbg1, #navigationbg2"], {
      duration: 1,
      height: "100%",
      transformOrigin: "right top",
      stagger: {
        amount: 0.1,
      },
      ease: "power3.inOut",
    })
    .from(".nav-link", {
      duration: 0.5,
      x: -80,
      opacity: 0,
      stagger: {
        amount: 0.5,
      },
      ease: "Power3.in",
    });
};

export const preloader = () => {
  const tl = gsap.timeline();
  tl.to(".preloaderText", {
    duration: 0.5,
    opacity: 1,
    stagger: {
      amount: 1,
    },
    ease: "Power3.in",
  }).to("#preloader", {
    duration: 1,
    height: "0%",
    transformOrigin: "right top",
    stagger: {
      amount: 0.1,
    },
    ease: "power3.inOut",
  })
};
