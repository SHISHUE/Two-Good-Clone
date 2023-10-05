
function gsapLoco() {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
gsapLoco()

function navAnimation() {
    gsap.to('.nav-part1' ,{
        transform: 'translateY(-122%)',
        overflow: 'visible',
        scrollTrigger:{
            trigger:'.container',
            scroller:'.main',
            start:"top 0%",
            end: "top -1%",
            scrub:true
        }
    })

    gsap.to('.links' ,{
        transform: 'translateY(-122%)',
        opacity: 0,
        scrollTrigger:{
            trigger:'.container',
            scroller:'.main',
            start:"top 0%",
            end: "top -1%",
            scrub:true
        }
    })
}
navAnimation()

function movePlay() {
    const play = document.querySelector('.play-btn');
const video = document.querySelector('.video-container ');


const playWidth = play.offsetWidth;
const playHeight = play.offsetHeight;


video.addEventListener('mouseenter', () =>{
    gsap.to(play,{
        scale:1,
    })
})

video.addEventListener('mouseleave', () =>{
    gsap.to(play,{
        scale:0,
    })
})

video.addEventListener('mousemove', (e) => {
    const bounds = video.getBoundingClientRect();

    // Adjusted for the relative position to the video container and the play button size
    const adjustedX = e.clientX - bounds.left - playWidth / 2;
    const adjustedY = e.clientY - bounds.top - playHeight / 2;

    gsap.to(play, {
        left: adjustedX + 'px',
        top: adjustedY + 'px',
    });
});
}
movePlay()

function loadingAnimation() {

    gsap.from(".container h1",{
        y:300,
        delay:0.5,
        stagger:0.3,
        duraction:0.9,
        opacity:0
    })

    gsap.from(".video-container video",{
        scale:0.9,
        delay:1.5,
        stagger:0.3,
        duraction:0.3,
        opacity:0
    })
}
loadingAnimation()


function childAnimation() {
    let child = document.querySelectorAll('.child');
let cursor = document.querySelector('.cursor');

document.addEventListener("mousemove" , function(dets){
    gsap.to('.cursor',{
        left:dets.x,
        top:dets.y
    })
})

child.forEach(function(elem){
    elem.addEventListener('mouseenter' , function(dets){
        gsap.to('.cursor' , {
            // left: dets.clientX + "px",
            // top: dets.clientY + "px",
            transform: 'translate(-50%,-50%) scale(1)'
        })
    })

    elem.addEventListener('mouseleave' , function(dets){
        gsap.to('.cursor' , {
            // left: dets.clientX + "px",
            // top: dets.clientY + "px",
            transform: 'translate(-50%,-50%) scale(0)'
        })
    })
})
}

childAnimation()
