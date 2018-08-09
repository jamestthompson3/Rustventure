import { World } from './rust_game'
import { memory } from './rust_game_bg'
// styles
const GRASS_COLOR = '#BADA55'
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
const world = World.new(width, height)
const PIXEL_SIZE = 5

// setup canvas
const canvas = document.getElementById('game-canvas')
canvas.height = height
canvas.width = width
const ctx = canvas.getContext('2d')

const getIndex = (row, column) => row * width + column

const drawCells = () => {
  const cellsPtr = world.pixels()
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height)

  ctx.beginPath()

  // Because changing the `fillStyle` is an expensive operation, we want to
  // avoid doing it for every cell. Instead, we do for each land type

  // Grass cells.
  ctx.fillStyle = GRASS_COLOR
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col)
      if (cells[idx] !== GRASS) {
        continue
      }

      ctx.fillRect(col * (PIXEL_SIZE + 1) + 1, row * (PIXEL_SIZE + 1) + 1, PIXEL_SIZE, PIXEL_SIZE)
    }
  }

  // Water cells.
  ctx.fillStyle = WATER_COLOR
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col)
      if (cells[idx] !== WATER) {
        continue
      }

      ctx.fillRect(col * (PIXEL_SIZE + 1) + 1, row * (PIXEL_SIZE + 1) + 1, PIXEL_SIZE, PIXEL_SIZE)
    }
  }

  // Desert cells.
  ctx.fillStyle = DESERT_COLOR
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col)
      if (cells[idx] !== DESERT) {
        continue
      }

      ctx.fillRect(col * (PIXEL_SIZE + 1) + 1, row * (PIXEL_SIZE + 1) + 1, PIXEL_SIZE, PIXEL_SIZE)
    }
  }

  // Ice cells.
  ctx.fillStyle = ICE_COLOR
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      const idx = getIndex(row, col)
      if (cells[idx] !== ICE) {
        continue
      }

      ctx.fillRect(col * (PIXEL_SIZE + 1) + 1, row * (PIXEL_SIZE + 1) + 1, PIXEL_SIZE, PIXEL_SIZE)
    }
  }

  //   ctx.stroke()
}
drawCells()
