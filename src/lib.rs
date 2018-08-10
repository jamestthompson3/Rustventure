#![feature(use_extern_macros)]
#![feature(exclusive_range_pattern)]

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use rand::prelude::*;

#[wasm_bindgen]
pub struct World {
    width: u32,
    height: u32,
    pixels: Vec<Pixel>,
    loot: Vec<TreasureChest>
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
    value: 1
}

#[wasm_bindgen]
pub struct Arrow {
    quantity: u32,
}

#[wasm_bindgen]
pub struct TreasureChest {
    x: u32,
    y: u32,
    loot: Treasure
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
    Arrow
}

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
            loot
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
pub struct Character {
    x: u32,
    y: u32,
    health: u32,
}

#[wasm_bindgen]
impl Character {
    pub fn new() -> Character {
        let health = 100;
        let x: 0;
        let y: 0;
        Character { x, y, health }
    }
    pub fn move_left(&self) {
        self.x = self.x == 0 ? 0 : self.x - 1
    }
    pub fn move_right(&self) {
        self.x = self.x == 0 ? 0 : self.x + 1
    }
    pub fn move_down(&self) {
        self.y = self.y == 0 ? 0 : self.y - 1
    }
    pub fn move_up(&self) {
        self.y = self.y == 0 ? 0 : self.y + 1
    }
    pub fn coords(&self) -> (u32, u32) {
        (self.x, self.y)
    }
    pub fn health(&self) -> u32 {
        self.health
    }
    pub fn take_damage(&self, hit: u32) -> u32 {
        self.health = self.health == 0 ? 0 : self.health - hit
    }
    pub fn heal(&self, heal: u32) -> u32 {
        self.health = self.health == 100 ? 100 : self.health + heal
    }
}

// TODO randomly assign values for treasure items
fn seed_loot(height: &u32, width: &u32) -> Vec<TreasureChest> {
    let mut rng = thread_rng();
    let num_boxes = rng.gen_range(0, 25);
    let mut boxes = Vec::new();

    for 0..num_boxes {
       let x = rng.gen_range(0, *width);
       let y = rng.gen_rang(0, *height);
       let contents_gen = rng.gen_range(0, 5);
       let loot = match contents_gen {
        0 => Potion,
        1 => Key,
        2 => Arrow,
        3 => Trap,
        4 => Gold
       }
       boxes.push(TreasureChest { x, y, loot })
    }
    boxes
}
