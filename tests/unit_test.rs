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
    fn creates_new_character() {
        let character = rust_game::Character::new();
        assert_eq!(character.health(), 100);
        assert_eq!(character.coords(), (0, 0));
    }

    #[test]
    fn moves_character() {
        let character = rust_game::Character::new();
        character.move_right();
        character.move_right();
        assert_eq!(character.coords(), (0, 2));

        character.move_up();
        character.move_left();
        assert_eq!(character.coords(), (1, 1));
    }

    #[test]
    fn hurts_and_heals_character() {
        let character = rust_game::Character::new();
        character.take_damage(80);
        assert_eq!(character.health(), 20);

        character.heal(30);
        assert_eq!(character.health(), 50);
    }

}
