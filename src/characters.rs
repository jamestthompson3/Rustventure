extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize)]
enum Classification {
    Hero,
    Enemy,
}

#[derive(Serialize)]
struct Weapon {
    name: String,
    damage: u8,
}

#[derive(Serialize)]
struct Potion {
    name: String,
    effect: PotionEffect,
    effect_multiplier: u8,
}

#[derive(Serialize)]
enum PotionEffect {
    Heal,
    Damage,
    Special,
}

#[derive(Serialize)]
struct Inventory {
    weapon: Option<Weapon>,
    potion: Option<Potion>,
    gold: u8,
}

#[wasm_bindgen]
#[derive(Serialize)]
pub struct Character {
    x: u32,
    y: u32,
    health: u32,
    classification: Classification,
    name: String,
    inventory: Inventory,
}

#[wasm_bindgen]
impl Character {
    pub fn new_enemy(x: u32, y: u32) -> Character {
        let health = 40;
        let class = Classification::Enemy;
        let starting_inventory = Inventory {
            weapon: None,
            potion: None,
            gold: 10,
        };
        Character {
            x,
            y,
            health,
            classification: class,
            inventory: starting_inventory,
            name: String::from("enemy"),
        }
    }
    pub fn new_hero(name: String) -> Character {
        let health = 100;
        let x = 0;
        let y = 0;
        let class = Classification::Hero;
        // TODO create better enemy inventory
        let starting_inventory = Inventory {
            weapon: None,
            potion: None,
            gold: 15,
        };
        Character {
            x,
            y,
            health,
            classification: class,
            inventory: starting_inventory,
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
