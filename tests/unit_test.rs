#![feature(extern_prelude)]

extern crate rust_game;
mod tests {
    #[test]
    fn creates_a_300_by_500_map() {
        let world = rust_game::World::new(300, 500);
        assert_eq!(world.width(), 300);
        assert_eq!(world.height(), 500);
    }

    #[test]
    fn creates_new_hero() {
        let hero = rust_game::Hero::new();
        assert_eq!(hero.health(), 100);
        assert_eq!(hero.coords(), (0, 0));
    }

    #[test]
    fn moves_hero() {
        let hero = rust_game::Hero::new();
        hero.move_right();
        hero.move_right();
        assert_eq!(hero.coords(), (0, 2));

        hero.move_up();
        hero.move_left();
        assert_eq!(hero.coords(), (1, 1));
    }

    #[test]
    fn hurts_and_heals_hero() {
        let hero = rust_game::Hero::new();
        hero.take_damage(80);
        assert_eq!(hero.health(), 20);

        hero.heal(30);
        assert_eq!(hero.health(), 50);
    }

}
