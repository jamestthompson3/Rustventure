/* tslint:disable */
/**
* @param {number} width 
* @param {number} height 
* @param {string} hero_name 
* @returns {Game} 
*/
export function start_game(width: number, height: number, hero_name: string): Game;
/**
*/
export class Character {
  free(): void;
  static new_enemy(x: number, y: number): Character;
  static new_hero(name: string): Character;
  name(): string;
  coords(): Uint32Array;
  get_class(): number;
  health(): number;
  take_damage(hit: number): void;
  heal(heal: number): void;
  move_left(width: number): void;
  move_right(width: number): void;
  move_down(height: number): void;
  move_up(height: number): void;
}
/**
*/
export class Game {
  free(): void;  tick(event_code: number): any;
  get_world_pixels(): number;
  get_state(): any;
  loot(): any;

}
/**
*/
export class TreasureChest {
  free(): void;
}
