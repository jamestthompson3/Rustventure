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
}

#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Pixel {
    Grass = 0,
    Water = 1,
    Desert = 2,
    Ice = 3,
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

        World {
            width,
            height,
            pixels,
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
