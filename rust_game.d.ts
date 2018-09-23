/* tslint:disable */
export class TreasureChest {
free(): void;
}
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
export class World {
free(): void;
static  new(arg0: number, arg1: number, arg2: string): World;

 width(): number;

 height(): number;

 pixels(): number;

 get_hero_coords(): Uint32Array;

 loot(): any;

 tick(arg0: number): any;

}
