/* tslint:disable */
export class World {
free(): void;
static  new(arg0: number, arg1: number, arg2: string): World;

 width(): number;

 height(): number;

 pixels(): number;

 get_hero_health(): number;

 get_hero_coords(): Uint32Array;

 loot(): any;

 enemies(): any;

 tick(arg0: number): any;

}
export class TreasureChest {
free(): void;
}
export class Character {
free(): void;
static  new_enemy(arg0: number, arg1: number): Character;

static  new_hero(arg0: string): Character;

 name(): string;

 coords(): Uint32Array;

 get_class(): number;

 health(): number;

 take_damage(arg0: number): void;

 heal(arg0: number): void;

 move_left(arg0: number): void;

 move_right(arg0: number): void;

 move_down(arg0: number): void;

 move_up(arg0: number): void;

}
