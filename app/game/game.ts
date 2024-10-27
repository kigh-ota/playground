// TODO separate game logic and DOM

export function start(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!;

  const cursor = new Cursor(0.5 * canvas.width, 0.5 * canvas.height);
  const target = new Target(0, 0, canvas.width, canvas.height);
  const bullets: Bullet[] = [];
  const input = new InputState();

  function clearScreen() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const cb = () => {
    cursor.step(input);
    if (input.spacePressed()) {
      console.log('fire!');
      bullets.push(new Bullet(cursor.x(), cursor.y()));
      console.log(bullets.length);
    }
    target.step();

    bullets
      .map((b, i) => {
        if (!b.step()) {
          return i;
        } else {
          return null;
        }
      })
      .reverse()
      .forEach((i) => {
        i !== null && bullets.splice(i, 1);
      });

    clearScreen();
    cursor.draw(ctx);
    target.draw(ctx);
    bullets.forEach((b) => b.draw(ctx));

    input.step();

    requestAnimationFrame(cb);
  };

  // start loop
  requestAnimationFrame(cb);
}

const BULLET_LIFETIME = 60; // frames
const BULLET_INIT_SIZE = BULLET_LIFETIME;

class Bullet {
  private elapsed: number;

  constructor(readonly x: number, readonly y: number) {
    this.elapsed = 0;
  }

  step(): boolean {
    this.elapsed++;
    return this.elapsed <= BULLET_LIFETIME;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const size = BULLET_INIT_SIZE - this.elapsed;
    ctx.strokeRect(this.x - 0.5 * size, this.y - 0.5 * size, size, size);
  }
}

const CURSOR_SIZE = 60;
class Cursor {
  private x_: number;
  private y_: number;

  constructor(x: number, y: number) {
    this.x_ = x;
    this.y_ = y;
  }

  x() {
    return this.x_;
  }

  y() {
    return this.y_;
  }

  step(input: InputState) {
    input.left() && this.x_--;
    input.right() && this.x_++;
    input.up() && this.y_--;
    input.down() && this.y_++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeRect(
      this.x_ - 0.5 * CURSOR_SIZE,
      this.y_ - 0.5 * CURSOR_SIZE,
      CURSOR_SIZE,
      CURSOR_SIZE
    );
  }
}

const TARGET_SIZE = 60;
class Target {
  private x_: number;
  private y_: number;

  constructor(
    x: number,
    y: number,
    private readonly canvasWidth: number,
    private readonly canvasHeight: number
  ) {
    this.x_ = x;
    this.y_ = y;
  }

  x() {
    return this.x_;
  }

  y() {
    return this.y_;
  }

  step() {
    this.x_++;
    this.y_++;
    this.x_ %= this.canvasWidth;
    this.y_ %= this.canvasHeight;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      this.x() - 0.5 * TARGET_SIZE,
      this.y() - 0.5 + TARGET_SIZE,
      0.5 * TARGET_SIZE,
      0,
      2 * Math.PI
    );
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }
}

type Inputs = {
  left: boolean;
  right: boolean;
  up: boolean;
  down: boolean;
  space: boolean;
};
class InputState {
  private curr: Inputs;
  private prev: Inputs;

  constructor() {
    this.curr = {
      left: false,
      right: false,
      up: false,
      down: false,
      space: false,
    };
    this.prev = { ...this.curr };
    this.setupKeyHandlers();
  }

  left() {
    return this.curr.left;
  }
  right() {
    return this.curr.right;
  }
  up() {
    return this.curr.up;
  }
  down() {
    return this.curr.down;
  }
  spacePressed() {
    return this.curr.space && !this.prev.space;
  }

  step() {
    this.prev = { ...this.curr };
  }

  private setupKeyHandlers() {
    document.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
          this.curr.right = true;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
          this.curr.left = true;
        } else if (e.key === 'Up' || e.key === 'ArrowUp') {
          this.curr.up = true;
        } else if (e.key === 'Down' || e.key === 'ArrowDown') {
          this.curr.down = true;
        } else if (e.key === ' ') {
          this.curr.space = true;
        }
      },
      false
    );
    document.addEventListener(
      'keyup',
      (e) => {
        if (e.key === 'Right' || e.key === 'ArrowRight') {
          this.curr.right = false;
        } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
          this.curr.left = false;
        } else if (e.key === 'Up' || e.key === 'ArrowUp') {
          this.curr.up = false;
        } else if (e.key === 'Down' || e.key === 'ArrowDown') {
          this.curr.down = false;
        } else if (e.key === ' ') {
          this.curr.space = false;
        }
      },
      false
    );
  }
}
