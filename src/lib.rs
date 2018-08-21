#![feature(use_extern_macros)]
#![feature(exclusive_range_pattern)]

extern crate rand;
extern crate wasm_bindgen;
pub mod characters;

use characters::*;
use rand::prelude::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct World {
    width: u32,
    height: u32,
    pixels: Vec<Pixel>,
    loot: Vec<TreasureChest>,
    hero: Character,
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(msg: &str);
}

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ($($t:tt)*) => (log(&format!($($t)*)))
}
// TODO generate a better map
#[wasm_bindgen]
impl World {
    pub fn new(width: u32, height: u32, hero_name: String) -> World {
        let pixels: Vec<Pixel> = (0..width * height)
            .map(|i| match i {
                0..700 => Pixel::Water,
                800..950 => Pixel::Desert,
                1000..1200 => Pixel::Ice,
                _ => Pixel::Grass,
            }).collect();

        let made = String::from("created map");
        log(&made);
        let loot = seed_loot(&width, &height);
        let hero = Character::new_hero(hero_name);

        World {
            width,
            height,
            pixels,
            loot,
            hero,
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
    pub fn tick(&mut self, event_code: u32) {
        match event_code {
            64 => {
                self.hero.move_left();
            }
            68 => {
                self.hero.move_right();
            }
            87 => {
                self.hero.move_up();
            }
            83 => {
                self.hero.move_down();
            }
            _ => (),
        }
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
