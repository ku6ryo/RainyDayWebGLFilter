export class RainRenderer {
  
  #canvas: HTMLCanvasElement
  #numParticles = 1000;

  #particles: {
    x: number,
    y: number,
    len: number,
    xs: number,
    ys: number,
  }[] = []

  constructor() {
    this.#canvas = document.createElement("canvas")
    this.createParticles()
  }

  private createParticles() {
    const w = this.#canvas.width;
    const h = this.#canvas.height;
    this.#particles = Array(this.#numParticles).fill(null).map(() => {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        len: Math.random() * 1,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 + 10
      }
    })
  }
  
  private move() {
    const w = this.#canvas.width;
    const h = this.#canvas.height;
    this.#particles.forEach(p => {
      p.x += p.xs;
      p.y += p.ys;
      if (p.x > w || p.y > h) {
        p.x = Math.random() * w;
        p.y = -20;
      }
    })
  }

  private getContext() {
    const ctx = this.#canvas.getContext("2d")
    if (!ctx) {
      throw new Error("no context")
    }
    return ctx
  }

  getCanvas() {
    return this.#canvas
  }

  setSize(width: number, height: number) {
    this.#canvas.width = width
    this.#canvas.height = height
    this.createParticles()
  }

  process() {
    const ctx = this.getContext()
    ctx.strokeStyle = "rgba(174,194,224,0.2)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
    this.#particles.forEach(p => {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + p.len * p.xs, p.y + p.len * p.ys);
      ctx.stroke();
    })
    this.move()
  }
}