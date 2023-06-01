/* working code but item still move when we move out of the section  */

/* const track = document.getElementById("image-track");
window.onmousedown = e => {
    track.dataset.mouseDownAt = e.clientX;
}
window.onmouseup = () => {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}
window.onmousemove = e => {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2; 

    const minP = -160, maxP = 0; 

    const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + percentage, minP), maxP);

    track.dataset.percentage = nextPercentage;
    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    for (const image of track.getElementsByClassName("image")) {
        image.style.objectPosition = `${nextPercentage/2 + 100}% 50%`;
    }
} */

/* 
can use these too, for smother paralax effect : 

track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
},{duration:1200,fill:"forwards"});

image.animate({
    objectPosition: `${nextPercentage + 100} 50%`
},{duration:1200,fill:"forwards"});
*/

const track = document.getElementById("image-track");

function handleMouseDown(e) {
    track.dataset.mouseDownAt = e.clientX;
}

function handleMouseUp() {
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
}

function handleMouseMove(e) {
    if (track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    const minP = -160, maxP = 0; /* minP is -100 when the position of the box is absolute */

    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentage = Math.min(Math.max(parseFloat(track.dataset.prevPercentage) + percentage, minP), maxP);

    track.dataset.percentage = nextPercentage;
    track.style.transform = `translate(${nextPercentage}%, -50%)`;

    const images = track.getElementsByClassName("image");
    for (const image of images) {
        image.style.objectPosition = `${nextPercentage / 2 + 100}% 50%`;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".sec1");

    section.addEventListener("mouseenter", () => {
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
        window.addEventListener("mousemove", handleMouseMove);
    });

    section.addEventListener("mouseleave", () => {
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mousemove", handleMouseMove);
    });
});





const section = document.querySelector('.sec2');
const scrollAmount = 350;

section.addEventListener('wheel', (event) => {
    event.preventDefault();
    const scrollDirection = event.deltaY > 0 ? 1 : -1;
    const scrollPosition = section.scrollLeft;
    const maxScroll = section.scrollWidth - section.clientWidth;

    if ((scrollDirection === 1 && scrollPosition === maxScroll) ||
        (scrollDirection === -1 && scrollPosition === 0)) {
        window.scrollBy({
            top: scrollAmount * scrollDirection,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        const targetScrollLeft = section.scrollLeft + scrollAmount * scrollDirection;
        section.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
        });
        }
});



