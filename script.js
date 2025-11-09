const closedCard = document.getElementById('closedCard');
const openCard = document.getElementById('openCard');
const balloonsContainer = document.querySelector('.balloons');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');

confettiCanvas.width = 350;
confettiCanvas.height = 400;

closedCard.addEventListener('click', () => {
  closedCard.classList.add('hidden');
  openCard.classList.remove('hidden');
  createBalloons();
  startConfetti();

  // Play music
  const music = document.getElementById('birthdayMusic');
  music.play();
  music.loop = true; // optional: loop music
});

// 🎈 Create flying balloons
function createBalloons() {
  for (let i = 0; i < 12; i++) {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.style.left = `${Math.random() * 300}px`;
    balloon.style.background = `hsl(${Math.random() * 360}, 80%, 70%)`;
    balloon.style.animationDelay = `${Math.random() * 2}s`;
    balloonsContainer.appendChild(balloon);
  }
}

// 🎊 Confetti animation
let confetti = [];

function startConfetti() {
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      r: Math.random() * 4 + 2,
      d: Math.random() * 5,
      color: `hsl(${Math.random() * 360}, 90%, 60%)`
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.fillStyle = c.color;
    ctx.fillRect(c.x, c.y, c.r, c.r);
    ctx.fill();
  });
  updateConfetti();
  requestAnimationFrame(animateConfetti);
}

function updateConfetti() {
  confetti.forEach(c => {
    c.y += c.d;
    if (c.y > confettiCanvas.height) c.y = 0 - c.r;
  });
}