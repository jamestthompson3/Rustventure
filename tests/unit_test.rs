#![feature(extern_prelude)]

extern crate rust_game;
mod tests {
    #[test]
    fn creates_a_300_by_500_map() {
        let world = rust_game::World::new(300, 500);
        assert_eq!(world.width(), 300);
        assert_eq!(world.height(), 500);
    }
}
