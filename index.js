import { World } from './rust_game'
import { memory } from './rust_game_bg'
// styles
const GRASS_COLOR = '#2f7a60'
const ICE_COLOR = '#63e3f9'
const WATER_COLOR = '#63e3f9'
const DESERT_COLOR = '#a38c5b'

// enum matching from Rust
const GRASS = 0
const WATER = 1
const DESERT = 2
const ICE = 3

// create game map
const width = parseInt((window.innerWidth * 0.85).toFixed(2), 10)
const height = parseInt((window.innerHeight * 0.85).toFixed(2), 10)
const world = World.new(width, height, 'kevin')
const PIXEL_SIZE = 10

// setup canvas
const canvas = document.getElementById('game-canvas')
canvas.height = height
canvas.width = width
const ctx = canvas.getContext('2d')

// Add direction handlers
const LEFT = 65
const RIGHT = 68
const UP = 87
const DOWN = 83

const bindingsArray = [LEFT, RIGHT, UP, DOWN]
const handleMove = e => {
  if (bindingsArray.includes(e.which)) {
    world.tick(e.which)
    drawCells()
  }
}

document.addEventListener('keydown', handleMove)

const getIndex = (row, column) => row * width + column

const drawCells = () => {
  console.time('drawCells')
  const cellsPtr = world.pixels()
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height)

  const drawPixel = type => {
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        const idx = getIndex(row, col)
        if (cells[idx] !== type) {
          continue
        }

        ctx.fillRect(col * PIXEL_SIZE, row * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
      }
    }
  }

  ctx.beginPath()
  // Because changing the `fillStyle` is an expensive operation, we want to
  // avoid doing it for every cell. Instead, we do for each land type
  ctx.fillStyle = GRASS_COLOR
  drawPixel(GRASS)
  ctx.fillStyle = WATER_COLOR
  drawPixel(WATER)
  ctx.fillStyle = DESERT_COLOR
  drawPixel(DESERT)
  ctx.fillStyle = ICE_COLOR
  drawPixel(ICE)

  // hero
  const [x, y] = world.get_hero_coords()
  ctx.fillStyle = '#000'
  ctx.fillRect(x, y, 6, 6)
  console.timeEnd('drawCells')
}

requestAnimationFrame(drawCells)
