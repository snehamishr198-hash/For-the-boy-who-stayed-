const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    a: Math.random()
  });
}

let shootingStar = { x: -100, y: 100, active: false };

setInterval(() => {
  shootingStar.x = -100;
  shootingStar.y = Math.random() * canvas.height / 2;
  shootingStar.active = true;
}, 12000);

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  stars.forEach(s => {
    s.a += (Math.random() - 0.5) * 0.02;
    s.a = Math.max(0.3, Math.min(1, s.a));
    ctx.globalAlpha = s.a;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  if (shootingStar.active) {
    ctx.strokeStyle = "white";
    ctx.beginPath();
    ctx.moveTo(shootingStar.x, shootingStar.y);
    ctx.lineTo(shootingStar.x - 80, shootingStar.y + 20);
    ctx.stroke();
    shootingStar.x += 6;
    if (shootingStar.x > canvas.width) shootingStar.active = false;
  }

  requestAnimationFrame(animate);
}

animate();
