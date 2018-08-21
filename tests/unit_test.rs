#![feature(extern_prelude)]

extern crate rust_game;

mod tests {

    #[test]
    fn creates_a_new_world_with_hero() {
        let world = rust_game::World::new(300, 500, String::from("conrad"));
        assert_eq!(world.hero.name(), "conrad");
        assert_eq!(world.width(), 300);
        assert_eq!(world.height(), 500);
    }

    #[test]
    fn calculates_move_tick() {
        let mut world = rust_game::World::new(300, 500, String::from("conrad"));
        world.tick(68);
        assert_eq!(world.hero.coords(), vec![1, 0]);
        world.tick(87);
        assert_eq!(world.hero.coords(), vec![1, 0]);
        world.tick(83);
        assert_eq!(world.hero.coords(), vec![1, 1]);
    }

    // #[test]
    // fn calculates_damage_tick() {
    //     let world = rust_game::World::new(300, 500);
    //     assert_eq!(world.width(), 300);
    //     assert_eq!(world.height(), 500);
    // }

    // #[test]
    // fn creates_new_hero() {
    //     let hero = rust_game::Character::new_hero();
    //     assert_eq!(hero.health(), 100);
    //     assert_eq!(hero.coords(), vec![0, 0]);
    //     assert_eq!(hero.get_class(), 1)
    // }

    // #[test]
    // fn moves_hero() {
    //     let mut hero = rust_game::Character::new_hero();
    //     hero.move_right();
    //     hero.move_right();
    //     assert_eq!(hero.coords(), vec![2, 0]);

    //     hero.move_up();
    //     hero.move_left();
    //     assert_eq!(hero.coords(), vec![1, 1]);
    // }

    // #[test]
    // fn hurts_and_heals_hero() {
    //     let mut hero = rust_game::Character::new_hero();
    //     hero.take_damage(80);
    //     assert_eq!(hero.health(), 20);

    //     hero.heal(30);
    //     assert_eq!(hero.health(), 50);
    // }

}
