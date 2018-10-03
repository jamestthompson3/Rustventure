#![feature(exclusive_range_pattern)]

extern crate console_error_panic_hook;
extern crate rand;
extern crate wasm_bindgen;
pub mod characters;

#[macro_use]
extern crate serde_derive;

use characters::*;
use std::prelude::v1::Vec;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn start_game(width: u32, height: u32, hero_name: String) -> Game {
    let world = intialize_world(width, height);
    let state = set_initial_game_state(hero_name);
    Game { world, state }
}

// TODO generate a better map
fn intialize_world(width: u32, height: u32) -> World {
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
        })
        .collect();
    let loot = seed_loot(&width, &height);
    World {
        width,
        height,
        pixels,
        loot,
    }
}

fn seed_loot(_height: &u32, _width: &u32) -> Vec<TreasureChest> {
    let num_boxes: u32 = 15;
    let mut boxes = Vec::new();

    for n in 0..num_boxes {
        let x: u32 = n % 3 * 20;
        let y: u32 = n % 4 * 10;
        let contents_gen: u32 = random() as u32 * 100;
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
        boxes.push(TreasureChest {
            x,
            y,
            loot,
            is_found: false,
        });
    }
    boxes
}

fn set_initial_game_state(hero_name: String) -> GameState {
    let mut enemies = Vec::new();
    for i in 0..10 {
        enemies.push(Character::new_enemy(i % 3 * 10, i % 2));
    }
    let player = Character::new_hero(hero_name);

    GameState { player, enemies }
}

#[wasm_bindgen]
impl Game {
    pub fn tick(&mut self, event_code: u32) -> JsValue {
        let _timer = Timer::new("game tick");
        match event_code {
            65 | 72 => {
                self.state.player.move_left(self.world.width);
            }
            68 | 76 => {
                self.state.player.move_right(self.world.width);
            }
            87 | 75 => {
                self.state.player.move_up(self.world.height);
            }
            83 | 74 => {
                self.state.player.move_down(self.world.height);
            }
            _ => (),
        }
        // Evaluate new player location and response with an event about new location.
        // Currently location can be either treasure or enemies.
        // TODO implement for enemies
        //pub fn enemies(&self) -> JsValue {
        // JsValue::from_serde(&self.enemies).unwrap()
        // }

        let new_pos = self.state.player.coords();

        let mut location_data: LocationData = LocationData::None;

        for treasure in self.world.loot.iter_mut() {
            if *new_pos.get(0).unwrap() == treasure.x
                && *new_pos.get(1).unwrap() == treasure.y
                && !treasure.is_found()
            {
                treasure.mark_as_found();
                location_data = LocationData::Treasure {
                    value: treasure.get_treasure(),
                }
            }
        }
        JsValue::from_serde(&location_data).unwrap()
    }
    pub fn get_world_pixels(&self) -> *const Pixel {
        self.world.pixels()
    }
    pub fn loot(&self) -> JsValue {
        self.world.loot()
    }
}

#[wasm_bindgen]
impl World {
    pub fn pixels(&self) -> *const Pixel {
        self.pixels.as_ptr()
    }
    pub fn loot(&self) -> JsValue {
        JsValue::from_serde(&self.loot).unwrap()
    }
}

#[wasm_bindgen]
pub struct Game {
    world: World,
    state: GameState,
}

struct World {
    width: u32,
    height: u32,
    loot: Vec<TreasureChest>,
    pixels: Vec<Pixel>,
}

struct GameState {
    enemies: Vec<Character>,
    player: Character,
}

#[wasm_bindgen]
#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
struct TreasureChest {
    x: u32,
    y: u32,
    loot: Treasure,
    is_found: bool,
}

impl TreasureChest {
    pub fn get_treasure(&self) -> Treasure {
        self.loot.clone()
    }

    pub fn mark_as_found(&mut self) {
        self.is_found = true;
    }

    pub fn is_found(&self) -> bool {
        self.is_found
    }
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
enum Treasure {
    Gold { value: u32 },
    Potion { value: u32 },
    Trap { damage: u32 },
    Key { quantity: u8, name: String },
    Arrow { quantity: u32 },
}

#[repr(u8)]
#[derive(Clone, Debug, PartialEq, Eq, Serialize)]
enum LocationData {
    Treasure { value: Treasure },
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
