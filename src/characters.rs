#![feature(use_extern_macros)]
#![feature(exclusive_range_pattern)]

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

//#[derive(Clone, Copy, Debug, PartialEq, Eq)]
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
    name: String,
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
            name: String::from("enemy"),
        }
    }
    pub fn new_hero(name: String) -> Character {
        let health = 100;
        let x = 0;
        let y = 0;
        let class = Classification::Hero;
        Character {
            x,
            y,
            health,
            classification: class,
            name,
        }
    }
    pub fn name(&self) -> String {
        self.name.clone()
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
    pub fn move_left(&mut self, width: u32) {
        self.x = if self.x == 0 { width } else { self.x - 1 }
    }
    pub fn move_right(&mut self, width: u32) {
        self.x = if self.x == width { 0 } else { self.x + 1 }
    }
    pub fn move_down(&mut self, height: u32) {
        self.y = if self.y == height { 0 } else { self.y + 1 }
    }
    pub fn move_up(&mut self, height: u32) {
        self.y = if self.y == 0 { height } else { self.y - 1 }
    }
}
