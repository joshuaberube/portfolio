const balloonTypes = ['round', 'long', 'heart'] as const;
export type BalloonType = typeof balloonTypes[number];


const balloonColors = [
  {name: 'reddie', background: '#FC534C', outline: '#E80000'},
  {name: 'pinkie', background: '#FF76AF', outline: '#FF3F92'},
  {name: 'yello', background: '#FCDD69', outline: '#FDCA00'},
  {name: 'rune', background: '#DD90FD', outline: '#C849FE'},
  {name: 'bluey', background: '#95ECF9', outline: '#00D8FA'},
  {name: 'greenie', background: '#A4F95C', outline: '#85E629'},
] as const;

const INSIDE_CHANCES = [
  { type: 'coin', chance: 5 },
  { type: 'candy', chance: 5 },
  { type: 'confetti', chance: 20 }
] as const;
type Prize = (typeof INSIDE_CHANCES)[number]['type'];
type BalloonInside = Prize | 'nothing';

function validateInsideChances() {
  const total = INSIDE_CHANCES.reduce(
    (sum, option) => sum + option.chance,
    0
  );

  if (total > 100) {
    throw new Error(
      `Balloon inside chances total ${total}%, but cannot exceed 100%.`
    );
  }
}

validateInsideChances();


/** Using the inside chances, get a random one, or nothing. */
function rollBalloonInside(): BalloonInside {
  const roll = Math.random() * 100;
  let cutoff = 0;

  for (const option of INSIDE_CHANCES) {
    cutoff += option.chance;

    if (roll < cutoff) {
      return option.type;
    }
  }

  return 'nothing';
}


let nextId = 0;

export class Balloon {
  readonly id = nextId++;
  readonly x = Math.random() * 100; // viewport, this may need to be adjusted so you don't have partial balloons offscreen
  y = -150; // px amount below viewport
  popped = false;
  readonly speed = 55 + (Math.random() * 95);
  readonly size = 80 + (Math.random() * 20);
  readonly rotation = Math.random() * 50 - 25;
  readonly color = balloonColors[
    Math.floor(Math.random() * balloonColors.length)
  ];
  readonly type: BalloonType = balloonTypes[
    Math.floor(Math.random() * balloonTypes.length)
  ];
  readonly inside = rollBalloonInside();


  move(seconds: number): void {
    this.y += this.speed * seconds;
  }

  pop() {
    if (this.popped) return false;

    this.popped = true;
    return true;
  }

  get isOffScreen(): boolean {
    return this.y > window.innerHeight + this.size;
  }
}
