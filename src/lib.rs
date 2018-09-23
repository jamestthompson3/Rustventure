#![feature(use_extern_macros)]
#![feature(exclusive_range_pattern)]

extern crate console_error_panic_hook;
extern crate rand;
extern crate wasm_bindgen;
mod characters;

#[macro_use]
extern crate serde_derive;

use characters::*;
use std::*;
use wasm_bindgen::prelude::*;
use std::prelude::v1::Vec;

#[wasm_bindgen]
pub struct World {
    width: u32,
    height: u32,
    pixels: Vec<Pixel>,
    hero: Character,
    loot: Vec<TreasureChest>,
}

// TODO generate a better map
#[wasm_bindgen]
impl World {
    pub fn new(width: u32, height: u32, hero_name: String) -> World {
        console_error_panic_hook::set_once();
        let pixels: Vec<Pixel> = (0..width * height)
            .map(|i| {
                if i % 7 == 0 {
                    Pixel::Desert
                } else if i % 4 == 0 || i % 3 == 1 {
                    Pixel::Grass
                } else if i % 5 == 0 {
                    Pixel::Water
                } else {
                    Pixel::Grass
                }
            }).collect();

        let loot = seed_loot(&width, &height);

        let hero = Character::new_hero(hero_name);

        World {
            width,
            height,
            pixels,
            hero,
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
    pub fn get_hero_coords(&self) -> Vec<u32> {
        return self.hero.coords();
    }
    pub fn loot(&self) -> JsValue {
        JsValue::from_serde(&self.loot).unwrap()
    }
    pub fn tick(&mut self, event_code: u32) -> LocationData {
        let _timer = Timer::new("world tick");
        match event_code {
            65 | 72 => {
                self.hero.move_left();
            }
            68 | 76 => {
                self.hero.move_right();
            }
            87 | 75 => {
                self.hero.move_up();
            }
            83 | 74 => {
                self.hero.move_down();
            }
        }

        // Evaluate new hero location and response with an event about new location.
        // Currently location can be either treasure or enemies.
        let new_pos = self.hero.coords();

        let mut location_data : LocationData = LocationData:None;
        for treasure in self.loot.iter() {
            if new_pos.get(0) == treasure.x && new_pos.get(1) == treasure.y {
                location_data = LocationData::Treasure( treasure )
            }
        }

        location_data
    }
}

// TODO randomly assign values for treasure items also this part causes the wasm to fail :/
fn seed_loot(_height: &u32, _width: &u32) -> Vec<TreasureChest> {
    let num_boxes: u32 = 15;
    let mut boxes = Vec::new();

    for n in 0..num_boxes {
        let x: u32 = n % 3;
        let y: u32 = n % 4 * 10;
        let contents_gen: u32 = random() as u32 * 10;
        let loot = match contents_gen {
            0 => Treasure::Potion { value: 2 },
            1 => Treasure::Key {
                name: String::from("dungeon key"),
                quantity: 1,
            },
            2 => Treasure::Arrow { quantity: 12 },
            3 => Treasure::Trap { damage: 3 },
            4 => Treasure::Gold { value: 30 },
            _ => Treasure::Gold { value: 10 },
        };
        boxes.push(TreasureChest { x, y, loot });
    }
    boxes
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
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
#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
pub enum Treasure {
    Gold { value: u32 },
    Potion { value: u32 },
    Trap { damage: u32 },
    Key { quantity: u8, name: String },
    Arrow { quantity: u32 },
}

#[repr(u8)]
#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
pub enum LocationData {
    Treasure{ value: Treasure },
    None,
}

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn time(name: &str);

    #[wasm_bindgen(js_namespace = console)]
    fn timeEnd(name: &str);

    #[wasm_bindgen(js_namespace = Math)]
    fn random() -> f64;
    fn ceil(num: f64) -> u32;
    fn floor(num: f64) -> u32;

}

pub struct Timer<'a> {
    name: &'a str,
}

impl<'a> Timer<'a> {
    pub fn new(name: &'a str) -> Timer<'a> {
        time(name);
        Timer { name }
    }
}

impl<'a> Drop for Timer<'a> {
    fn drop(&mut self) {
        timeEnd(self.name);
    }
}
// JS implementations
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(msg: &str);
}

// A macro to provide `println!(..)`-style syntax for `console.log` logging.
macro_rules! log {
    ($($t:tt)*) => (log(&format!($($t)*)))
}
