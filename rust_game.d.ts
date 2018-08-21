/* tslint:disable */
export class Character {
free(): void;
static  new_enemy(): Character;

static  new_hero(arg0: string): Character;

 name(): string;

 coords(): Uint32Array;

 get_class(): number;

 health(): number;

 take_damage(arg0: number): void;

 heal(arg0: number): void;

 move_left(): void;

 move_right(): void;

 move_down(): void;

 move_up(): void;

}
export class Gold {
free(): void;
}
export class World {
free(): void;
static  new(arg0: number, arg1: number, arg2: string): World;

 width(): number;

 height(): number;

 pixels(): number;

 tick(arg0: number): void;

}
export class Trap {
free(): void;
}
export class Arrow {
free(): void;
}
export class TreasureChest {
free(): void;
}
export class Key {
free(): void;
}
export class Potion {
free(): void;
}
