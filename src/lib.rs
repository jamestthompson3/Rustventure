#![feature(use_extern_macros)]
#![feature(exclusive_range_pattern)]

extern crate rand;
extern crate wasm_bindgen;

use rand::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct World {
    width: u32,
    height: u32,
    pixels: Vec<Pixel>,
    loot: Vec<TreasureChest>,
}

#[wasm_bindgen]
pub struct Potion {
    value: u32,
}

#[wasm_bindgen]
pub struct Trap {
    value: u32,
}

#[wasm_bindgen]
pub struct Gold {
    value: u32,
}

#[wasm_bindgen]
pub struct Key {
    name: String,
    value: u32,
}

#[wasm_bindgen]
pub struct Arrow {
    quantity: u32,
}

#[wasm_bindgen]
pub struct TreasureChest {
    x: u32,
    y: u32,
    loot: Treasure,
}

#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Pixel {
    Grass = 0,
    Water = 1,
    Desert = 2,
    Ice = 3,
}

#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Treasure {
    Gold,
    Potion,
    Trap,
    Key,
    Arrow,
}

// TODO generate a better map
#[wasm_bindgen]
impl World {
    pub fn new(width: u32, height: u32) -> World {
        let pixels: Vec<Pixel> = (0..width * height)
            .map(|i| match i {
                0..700 => Pixel::Water,
                800..950 => Pixel::Desert,
                1000..1200 => Pixel::Ice,
                _ => Pixel::Grass,
            }).collect();
        let loot = seed_loot(&width, &height);

        World {
            width,
            height,
            pixels,
            loot,
        }
    }
    pub fn width(&self) -> u32 {
        self.width
    }
    pub fn height(&self) -> u32 {
        self.height
    }
    pub fn pixels(&self) -> *const Pixel {
        self.pixels.as_ptr()
    }
}

#[wasm_bindgen]
pub struct Enemy {
    x: u32,
    y: u32,
    health: u32,
}

#[wasm_bindgen]
impl Enemy {
    pub fn new() -> Enemy {
        let health = 40;
        let x = 0;
        let y = 0;
        Enemy { x, y, health }
    }
    pub fn coords(&self) -> Vec<u32> {
        vec![self.x, self.y]
    }
    pub fn health(&self) -> u32 {
        self.health
    }
    pub fn take_damage(&self, hit: u32) -> u32 {
        self.health = if self.health == 0 {
            0
        } else {
            self.health - hit
        }
    }
    pub fn heal(&self, heal: u32) -> u32 {
        self.health = if self.health == 100 {
            100
        } else {
            self.health + heal
        }
    }
}

#[wasm_bindgen]
pub struct Hero {
    x: u32,
    y: u32,
    health: u32,
}

#[wasm_bindgen]
impl Hero {
    pub fn new() -> Hero {
        let health = 100;
        let x = 0;
        let y = 0;
        Hero { x, y, health }
    }
    pub fn move_left(&self) {
        self.x = if self.x == 0 { 0 } else { self.x - 1 }
    }
    pub fn move_right(&self) {
        self.x = if self.x == 0 { 0 } else { self.x + 1 }
    }
    pub fn move_down(&self) {
        self.y = if self.y == 0 { 0 } else { self.y - 1 }
    }
    pub fn move_up(&self) {
        self.y = if self.y == 0 { 0 } else { self.y + 1 }
    }
    pub fn coords(&self) -> Vec<u32> {
        vec![self.x, self.y]
    }
    pub fn health(&self) -> u32 {
        self.health
    }
    pub fn take_damage(&self, hit: u32) -> u32 {
        self.health = if self.health == 0 {
            0
        } else {
            self.health - hit
        }
    }
    pub fn heal(&self, heal: u32) -> u32 {
        self.health = if self.health == 100 {
            100
        } else {
            self.health + heal
        }
    }
}

// TODO randomly assign values for treasure items
fn seed_loot(height: &u32, width: &u32) -> Vec<TreasureChest> {
    let mut rng = thread_rng();
    let num_boxes: u32 = rng.gen_range(0, 25);
    let mut boxes = Vec::new();

    for n in 0..num_boxes {
        let x: u32 = rng.gen_range(0, *width);
        let y: u32 = rng.gen_range(0, *height);
        let contents_gen: u32 = rng.gen_range(0, 5);
        let loot = match contents_gen {
            0 => Treasure::Potion,
            1 => Treasure::Key,
            2 => Treasure::Arrow,
            3 => Treasure::Trap,
            4 => Treasure::Gold,
        };
        boxes.push(TreasureChest { x, y, loot });
    }
    boxes
}
