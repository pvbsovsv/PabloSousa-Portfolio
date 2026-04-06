//register scroll trigger

gsap.registerPlugin(
  ScrollTrigger,
  ScrambleTextPlugin,
  SplitText,
  Flip,
  ScrollToPlugin,
);

//Match-media > device = related animation

let mm = gsap.matchMedia();

//mobile media query

mm.add("(max-width:600px", () => {
  mobile();

  return () => {
    killAllTweens();
  };
});
//desktop media query

mm.add("(min-width:601px", () => {
  desktop();

  return () => {
    killAllTweens();
  };
});

//desktop animations

function desktop() {
  // top-nav animations -----------------

  //elements
  const navContainer = document.querySelector(".top-nav-container");
  const navLinks = document.querySelector(".top-nav");
  const navLinksEach = document.querySelectorAll(".top-nav li a");
  const logo = document.querySelector(".brand-logo");
  const hiddenNav = document.querySelectorAll(".hidden-nav li");

  gsap.set(hiddenNav, {
    scale: 0,
  });

  //scramble text on load page

  const tlTopNavScramble = gsap.timeline();

  tlTopNavScramble.to(navLinksEach, {
    duration: 1.5,
    scrambleText: {
      text: "{original}",
      chars: "abcdefghijklmnopqrstuvwxyz",
    },
  });

  //scroll trigger global listener on scroll

  let lastDirectionGlobal = 0;

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      if (self.direction !== lastDirectionGlobal) {
        lastDirectionGlobal = self.direction;

        gsap.to(navContainer, {
          y: self.direction === -1 ? 0 : "-140%",
          duration: 0.6,
          ease: "power1.inOut",
        });
        gsap.to(logo, {
          scale: self.direction === -1 ? 1 : 0,
          duration: 0.6,
          ease: "power1.inOut",
        });

        gsap.to(hiddenNav, {
          scale: self.direction === -1 ? 0 : 1,
          transformOrigin: "bottom top",
          stagger: 0.05,
          duration: 0.2,
          delay: 0.25,
          ease: "power3.out",
        });

        tlTopNavScramble.to(navLinksEach, {
          duration: 1.5,
          scrambleText: {
            text: "{original}",
            chars: "abcdefghijklmnopqrstuvwxyz",
          },
        });
      }
    },
  });

  //now on hover show menu

  const hiddenNavContainer = document.querySelector("header");

  hiddenNavContainer.addEventListener("mouseenter", () => {
    gsap.to(hiddenNav, {
      scale: 0,
      transformOrigin: "bottom top",
      stagger: 0.05,
      duration: 0.4,
      ease: "power3.out",
    });

    tlTopNavScramble.to(navLinksEach, {
      duration: 1.5,
      scrambleText: {
        text: "{original}",
        chars: "abcdefghijklmnopqrstuvwxyz",
      },
    });

    gsap.to(navContainer, {
      y: "0",
      duration: 0.6,
      ease: "power1.inOut",
    });

    gsap.to(logo, {
      scale: 1,
      duration: 0.6,
      ease: "power1.inOut",
    });
  });

  hiddenNavContainer.addEventListener("mouseleave", () => {
    hiddenNavContainer.style.width = "";

    gsap.to(hiddenNav, {
      scale: 1,
      transformOrigin: "bottom top",
      stagger: 0.05,
      duration: 0.4,
      ease: "power1.inOut",
    });

    gsap.to(navContainer, {
      y: "-140%",
      duration: 0.6,
      ease: "power1.inOut",
    });

    gsap.to(logo, {
      scale: 0,
      duration: 0.6,
      ease: "power1.inOut",
    });
  });

  // hero animations -----------------

  // scramble text

  const scrambleSentences = document.querySelectorAll(
    ".hero-container .slide-footer span",
  );

  const arrScramble = [...scrambleSentences];

  const tlHeroScramble = gsap.timeline({
    id: "hero-scramble",
    defaults: { ease: "none" },
  });

  tlHeroScramble
    .to(arrScramble[0], {
      duration: 0.5,
      scrambleText: {
        text: "{original}",
        chars: "abcdefghijklmnopqrstuvwxyz",
      },
    })

    .to(
      arrScramble[1],
      {
        duration: 1.5,
        scrambleText: {
          text: "{original}",
          chars: "abcdefghijklmnopqrstuvwxyz",
        },
      },
      "<",
    )
    .to(
      arrScramble[2],
      {
        duration: 1.5,
        scrambleText: {
          text: "{original}",
          chars: "1234567890",
        },
      },
      "<",
    );

  // about animation -----------------

  const aboutContainer = document.querySelector(".about-text");
  const aboutParagr = document.querySelector(".about-paragraph");
  const aboutHeaderyButtons = document.querySelector(".about-hb");

  const gridBtnOne = document.querySelector("#gridBtnOne");

  //split text
  const splitParagr = new SplitText(aboutParagr, { type: "chars words" });
  const chars = splitParagr.chars;

  //scramble on load
  gsap.to(chars, {
    duration: 3,
    stagger: 0.002,
    scrambleText: {
      text: "{original}",
      chars: "abcdefghijklmnopqrstuvwxyz1234567890",
    },
  });

  //gsap grid flip 1-2
  const aboutHeaderSpans = document.querySelectorAll(".about-header span");
  const aboutButtons = document.querySelectorAll(".about-buttons button");

  //listener
  gridBtnOne.addEventListener("click", () => {

    //lock container height before flip effett
    aboutContainer.style.height = aboutContainer.offsetHeight + "px";

    const state = Flip.getState([
      aboutContainer,
      aboutParagr,
      aboutHeaderyButtons,
      ...aboutHeaderSpans,
      ...aboutButtons,
      ".slide-footer-about"
    ]);

    aboutContainer.classList.toggle("about-text-two");
    aboutHeaderyButtons.classList.toggle("about-hb-two");
    aboutParagr.classList.toggle("about-paragraph-two");

    Flip.from(state, {
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.03,
      nested: true,
      absolute: true,
      onComplete: () => {
      // release after animation finishes
      aboutContainer.style.height = "";
    },
    });

    //scramble
    gsap.to(chars, {
      duration: 3,
      stagger: 0.002,
      scrambleText: {
        text: "{original}",
        chars: "abcdefghijklmnopqrstuvwxyz1234567890",
      },
    });
  });

  //Skills animations-------

  //scroll banner big typography

  const sentenceScroll = document.querySelector(".big-sentence");

  //scrol direction
  let lastDirectionSkills = 0;

  let skillsTl = gsap.timeline({ repeat: -1, yoyo: true });

  // set up the infinite animation once
  skillsTl.to(sentenceScroll, {
    x: "-87%",
    duration: 50,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      // check if direction changed
      if (self.direction !== lastDirectionSkills) {
        lastDirectionSkills = self.direction;

        // reverse or play forward based on direction
        if (self.direction === 1) {
          // scrolling down
          skillsTl.timeScale(1); // play forward
        } else {
          // scrolling up
          skillsTl.timeScale(-1); // play backward
        }
      }
    },
  });

  //footer animation

  const footerLinkContainer = document.querySelectorAll(
    "#footer-navigation ul li",
  );
  gsap.set(".footer-a2", { y: "20%" });

  // cada elemento li seria o "container" , o anchor dentro do container animado
  footerLinkContainer.forEach((cont) => {
    //para cada container seleccionamos o anchor dentro
    const link1 = cont.querySelector(".footer-a1");
    const link2 = cont.querySelector(".footer-a2");

    //evento mouse over (animaçao)
    cont.addEventListener("mouseenter", () => {
      gsap.killTweensOf(link1); //tiramos cualquer stacked animation que tinha (limpa bugs)
      gsap.killTweensOf(link2);
      const splitLink2 = new SplitText(link2, { type: "chars" });
      let linkChars = splitLink2.chars;

      gsap.to(link1, { y: "-100%", duration: 0.3 });
      gsap.to(link2, { y: "-100%", duration: 0.3 });

      gsap.to(linkChars, {
        duration: 2,
        stagger: 0.001,
        scrambleText: {
          text: "{original}",
          chars: "abcdefghijklmnopqrstuvwxyz1234567890",
        },
      });
    });

    //evento mouse out com reverse
    cont.addEventListener("mouseleave", () => {
      gsap.killTweensOf(link1);
      gsap.killTweensOf(link2);
      const splitLink1 = new SplitText(link1, { type: "chars" });
      let linkChars = splitLink1.chars;

      gsap.to(link1, { y: 0, duration: 0.1 });

      gsap.to(link2, { y: "20%", duration: 0.1 });

      gsap.to(linkChars, {
        duration: 2,
        stagger: 0.001,
        scrambleText: {
          text: "{original}",
          chars: "abcdefghijklmnopqrstuvwxyz1234567890",
        },
      });
    });
  });

  //Scroll To

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = link.getAttribute("href");

      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 30,
          autoKill: true,
        },
        ease: "power2.inOut",
      });
    });
  });

  //clock function

  weAreClosed();

  const hourInterval = setInterval(weAreClosed, 1000);

  /* end of desktop */
}

//mobile animations

function mobile() {

//top nav click
  

//elements
  const navContainer = document.querySelector(".top-nav-container");
  const navLinks = document.querySelector(".top-nav");
  const navLinksEach = document.querySelectorAll(".top-nav li a");
  const logo = document.querySelector(".brand-logo");
  const hiddenNav = document.querySelectorAll(".hidden-nav li");


  //hidden
  
gsap.set(hiddenNav, {
    scale: 0,
  });

  //scramble text on load page

  const tlTopNavScramble = gsap.timeline();

  tlTopNavScramble.to(navLinksEach, {
    duration: 1.5,
    scrambleText: {
      text: "{original}",
      chars: "abcdefghijklmnopqrstuvwxyz",
    },
  });

  //scroll trigger global listener on scroll

  let lastDirectionGlobal = 0;

  ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate: (self) => {
      if (self.direction !== lastDirectionGlobal) {
        lastDirectionGlobal = self.direction;

        gsap.to(navContainer, {
          y: self.direction === -1 ? 0 : "-140%",
          duration: 0.6,
          ease: "power1.inOut",
        });
        gsap.to(logo, {
          scale: self.direction === -1 ? 1 : 0,
          duration: 0.6,
          ease: "power1.inOut",
        });

        gsap.to(hiddenNav, {
          scale: self.direction === -1 ? 0 : 1,
          transformOrigin: "bottom top",
          stagger: 0.05,
          duration: 0.2,
          delay: 0.25,
          ease: "power3.out",
        });

        tlTopNavScramble.to(navLinksEach, {
          duration: 1.5,
          scrambleText: {
            text: "{original}",
            chars: "abcdefghijklmnopqrstuvwxyz",
          },
        });
      }
    },
  });






}


// we are open we are closed (footer)
function weAreClosed() {
  //data
  const dateNow = new Date();
  const optionsDate = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  //hora
  const timeNow = {
    hours: dateNow.getHours(),
    minutes: dateNow.getMinutes(),
    seconds: dateNow.getSeconds(),
  };

  let day = dateNow.getDay();
  let hours = timeNow.hours;
  let minutes = timeNow.minutes;
  let seconds = timeNow.seconds;
  if (hours < 1) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  const target = document.getElementById("dateTime");

  target.innerHTML = `${hours}:${minutes}:${seconds}  ${dateNow.toLocaleString(
    "en-EN",
    optionsDate,
  )}`;
}

//Kill animations (kills animation stacking)
function killAllTweens() {
  // kill geral
  gsap.killTweensOf("*");

  // kill scroll trigger geral
  if (gsap.plugins.ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  // reset all inline styles added by GSAP
  gsap.set("*", { clearProps: "all" });
}
