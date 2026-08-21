

export class ConfettiFX {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.animId = null;
    this.active = false;

    if (this.canvas) {
      this.resize();
      window.addEventListener('resize', () => this.resize());
    }
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 120, isGrandPrize = false) {
    if (!this.canvas || !this.ctx) return;

    this.particles = [];
    const colors = isGrandPrize
      ? ['#fbbf24', '#f59e0b', '#d97706', '#ffe699', '#ffffff', '#eab308']
      : ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#3b82f6', '#fbbf24'];

    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: this.canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: this.canvas.height / 2 - 50 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 18,
        vy: -Math.random() * 16 - 6,
        size: Math.random() * 10 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rSpeed: (Math.random() - 0.5) * 12,
        opacity: 1,
        gravity: 0.35,
        drag: 0.96,
        shape: Math.random() > 0.4 ? 'rect' : 'circle'
      });
    }

    this.active = true;
    if (this.animId) cancelAnimationFrame(this.animId);
    this.loop();
  }

  loop() {
    if (!this.active || !this.ctx) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let aliveCount = 0;
    for (let p of this.particles) {
      if (p.opacity <= 0.01 || p.y > this.canvas.height + 50) continue;

      aliveCount++;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rSpeed;
      p.opacity -= 0.006;

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    if (aliveCount > 0) {
      this.animId = requestAnimationFrame(() => this.loop());
    } else {
      this.active = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  stop() {
    this.active = false;
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
