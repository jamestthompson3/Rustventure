/* tslint:disable */
export class TreasureChest {
free(): void;
}
export class Character {
free(): void;
}
export class World {
free(): void;
static  new(arg0: number, arg1: number, arg2: string): World;

 width(): number;

 height(): number;

 pixels(): number;

 get_hero_coords(): Uint32Array;

 get_loot(): number;

 tick(arg0: number): void;

}
