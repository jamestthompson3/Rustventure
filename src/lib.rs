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

enum Classification {
    Hero,
    Enemy,
}

#[wasm_bindgen]
pub struct Character {
    x: u32,
    y: u32,
    health: u32,
    classification: Classification,
}

#[wasm_bindgen]
impl Character {
    pub fn new_enemy() -> Character {
        let health = 40;
        let x = 0;
        let y = 0;
        let class = Classification::Enemy;
        Character {
            x,
            y,
            health,
            classification: class,
        }
    }
    pub fn new_hero() -> Character {
        let health = 100;
        let x = 0;
        let y = 0;
        let class = Classification::Hero;
        Character {
            x,
            y,
            health,
            classification: class,
        }
    }

    pub fn coords(&self) -> Vec<u32> {
        vec![self.x, self.y]
    }
    pub fn get_class(&self) -> u8 {
        match self.classification {
            Classification::Hero => 1,
            Classification::Enemy => 0,
        }
    }
    pub fn health(&self) -> u32 {
        self.health
    }
    pub fn take_damage(&mut self, hit: u32) {
        self.health = if self.health == 0 {
            0
        } else {
            self.health - hit
        }
    }
    pub fn heal(&mut self, heal: u32) {
        self.health = if self.health == 100 {
            100
        } else {
            self.health + heal
        }
    }
    pub fn move_left(&mut self) {
        self.x = if self.x == 0 { 0 } else { self.x - 1 }
    }
    pub fn move_right(&mut self) {
        self.x = if self.x == 0 { 0 } else { self.x + 1 }
    }
    pub fn move_down(&mut self) {
        self.y = if self.y == 0 { 0 } else { self.y - 1 }
    }
    pub fn move_up(&mut self) {
        self.y = if self.y == 0 { 0 } else { self.y + 1 }
    }
}

// TODO randomly assign values for treasure items
fn seed_loot(height: &u32, width: &u32) -> Vec<TreasureChest> {
    let mut rng = thread_rng();
    let num_boxes: u32 = rng.gen_range(0, 25);
    let mut boxes = Vec::new();

    for _ in 0..num_boxes {
        let x: u32 = rng.gen_range(0, *width);
        let y: u32 = rng.gen_range(0, *height);
        let contents_gen: u32 = rng.gen_range(0, 5);
        let loot = match contents_gen {
            0 => Treasure::Potion,
            1 => Treasure::Key,
            2 => Treasure::Arrow,
            3 => Treasure::Trap,
            4 => Treasure::Gold,
            _ => Treasure::Gold,
        };
        boxes.push(TreasureChest { x, y, loot });
    }
    boxes
}
