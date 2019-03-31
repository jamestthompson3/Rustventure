import { start_game } from "./pkg/rust_game";
import { memory } from "./pkg/rust_game_bg";
import { genRandCoord } from "./utils";
// styles
const GRASS_COLOR = "#2f7a60";
const ICE_COLOR = "#63d3f9";
const WATER_COLOR = "blue";
const DESERT_COLOR = "#a38c5b";

// enum matching from Rust
const GRASS = 0;
const WATER = 1;
const DESERT = 2;
const ICE = 3;

// create game map
const width = parseInt((window.innerWidth * 0.85).toFixed(2), 10);
const height = parseInt((window.innerHeight * 0.85).toFixed(2), 10);
const game = start_game(width, height, "kevin");
const PIXEL_SIZE = 10;
const banner = document.getElementById("collision");
const healthBar = document.getElementById("health");

// setup canvas
const canvas = document.getElementById("game-canvas");
const heroCanvas = document.getElementById("hero-canvas");
canvas.height = height;
heroCanvas.height = height;
canvas.width = width;
heroCanvas.width = width;
const heroCtx = heroCanvas.getContext("2d");
const ctx = canvas.getContext("2d");

// Add direction handlers
const LEFT = [65, 72];
const RIGHT = [68, 76];
const UP = [87, 75];
const DOWN = [83, 74];

const bindingsArray = [...LEFT, ...RIGHT, ...UP, ...DOWN];
const handleMove = e => {
  if (bindingsArray.includes(e.which)) {
    const tick = game.tick(e.which);
    console.log(tick);
    drawHero();
    if (typeof tick !== "string") {
      renderCollision(tick);
    }
  }
};

document.addEventListener("keydown", handleMove);

const getIndex = (row, column) => row * width + column;

const drawCells = () => {
  ctx.clearRect(0, 0, width, height);
  const cellsPtr = game.get_world_pixels();
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

  const drawPixel = type => {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col);
        if (cells[idx] !== type) {
          continue;
        }

        ctx.fillRect(
          col * PIXEL_SIZE,
          row * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    }
  };

  ctx.beginPath();
  // Because changing the `fillStyle` is an expensive operation, we want to
  // avoid doing it for every cell. Instead, we do for each land type
  ctx.fillStyle = GRASS_COLOR;
  drawPixel(GRASS);
  ctx.fillStyle = WATER_COLOR;
  drawPixel(WATER);
  ctx.fillStyle = DESERT_COLOR;
  drawPixel(DESERT);
  ctx.fillStyle = ICE_COLOR;
  drawPixel(ICE);
  // loot
  const boxes = game.loot();
  boxes.forEach(box => {
    ctx.fillStyle = "#ffe030";
    ctx.fillRect(box.x, box.y, 8, 8);
  });

  const { enemies } = game.get_state();
  enemies.forEach(enemy => {
    ctx.fillStyle = "#BAD";
    ctx.fillRect(enemy.x, enemy.y, 8, 8);
  });
};

const drawHero = () => {
  const { player } = game.get_state();
  heroCtx.clearRect(0, 0, width, height);
  // hero
  const { x, y } = player;
  heroCtx.fillStyle = "#000";
  heroCtx.beginPath();
  heroCtx.arc(x, y, 6, 0, 2 * Math.PI);
  heroCtx.stroke();
  heroCtx.fill();
  // health
  healthBar.style.width = `${player.health}%`;
};

const renderCollision = tick => {
  const type = Object.keys(tick.Treasure.value)[0];
  banner.style.display = "block";
  banner.innerHTML = `You found ${type.replace('"', "")} - ${JSON.stringify(
    tick.Treasure.value[type]
  ).replace(/\{|\}|"/g, "")}`;
  setTimeout(hideBanner, 1500);
};

const hideBanner = () => {
  banner.style.display = "none";
};

window.requestAnimationFrame(drawCells);
window.requestAnimationFrame(drawHero);
