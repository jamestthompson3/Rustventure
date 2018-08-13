/* tslint:disable */
import * as wasm from './rust_game_bg';

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null || cachegetUint32Memory.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory;
}

function getArrayU32FromWasm(ptr, len) {
    return getUint32Memory().subarray(ptr / 4, ptr / 4 + len);
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}
/**
*/
export class Character {
    
    static __construct(ptr) {
        return new Character(ptr);
    }
    
    constructor(ptr) {
        this.ptr = ptr;
    }
    
    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_character_free(ptr);
    }
    /**
    * @returns {Character}
    */
    static new_enemy() {
        return Character.__construct(wasm.character_new_enemy());
    }
    /**
    * @returns {Character}
    */
    static new_hero() {
        return Character.__construct(wasm.character_new_hero());
    }
    /**
    * @returns {Uint32Array}
    */
    coords() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        const retptr = globalArgumentPtr();
        wasm.character_coords(retptr, this.ptr);
        const mem = getUint32Memory();
        const ptr = mem[retptr / 4];
        const len = mem[retptr / 4 + 1];
        
        const realRet = getArrayU32FromWasm(ptr, len).slice();
        wasm.__wbindgen_free(ptr, len * 4);
        return realRet;
        
    }
    /**
    * @returns {number}
    */
    get_class() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.character_get_class(this.ptr);
    }
    /**
    * @returns {number}
    */
    health() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.character_health(this.ptr);
    }
    /**
    * @param {number} arg0
    * @returns {void}
    */
    take_damage(arg0) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.character_take_damage(this.ptr, arg0);
    }
    /**
    * @param {number} arg0
    * @returns {void}
    */
    heal(arg0) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.character_heal(this.ptr, arg0);
    }
    /**
    * @returns {void}
    */
    move_left() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.character_move_left(this.ptr);
    }
    /**
    * @returns {void}
    */
    move_right() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.character_move_right(this.ptr);
    }
    /**
    * @returns {void}
    */
    move_down() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.character_move_down(this.ptr);
    }
    /**
    * @returns {void}
    */
    move_up() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.character_move_up(this.ptr);
    }
}
/**
*/
export class TreasureChest {
    
    static __construct(ptr) {
        return new TreasureChest(ptr);
    }
    
    constructor(ptr) {
        this.ptr = ptr;
    }
    
    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_treasurechest_free(ptr);
    }
}
/**
*/
export class Potion {
    
    static __construct(ptr) {
        return new Potion(ptr);
    }
    
    constructor(ptr) {
        this.ptr = ptr;
    }
    
    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_potion_free(ptr);
    }
}
/**
*/
export class Trap {
    
    static __construct(ptr) {
        return new Trap(ptr);
    }
    
    constructor(ptr) {
        this.ptr = ptr;
    }
    
    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_trap_free(ptr);
    }
}
/**
*/
export class Key {
    
    static __construct(ptr) {
        return new Key(ptr);
    }
    
    constructor(ptr) {
        this.ptr = ptr;
    }
    
    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_key_free(ptr);
    }
}
/**
*/
export class World {
    
    static __construct(ptr) {
        return new World(ptr);
    }
    
    constructor(ptr) {
        this.ptr = ptr;
    }
    
    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_world_free(ptr);
    }
    /**
    * @param {number} arg0
    * @param {number} arg1
    * @returns {World}
    */
    static new(arg0, arg1) {
        return World.__construct(wasm.world_new(arg0, arg1));
    }
    /**
    * @returns {number}
    */
    width() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.world_width(this.ptr);
    }
    /**
    * @returns {number}
    */
    height() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.world_height(this.ptr);
    }
    /**
    * @returns {number}
    */
    pixels() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.world_pixels(this.ptr);
    }
}
/**
*/
export class Gold {
    
    static __construct(ptr) {
        return new Gold(ptr);
    }
    
    constructor(ptr) {
        this.ptr = ptr;
    }
    
    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_gold_free(ptr);
    }
}
/**
*/
export class Arrow {
    
    static __construct(ptr) {
        return new Arrow(ptr);
    }
    
    constructor(ptr) {
        this.ptr = ptr;
    }
    
    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        wasm.__wbg_arrow_free(ptr);
    }
}

const TextDecoder = typeof self === 'object' && self.TextDecoder
    ? self.TextDecoder
    : require('util').TextDecoder;

let cachedDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

