/* tslint:disable */
import * as wasm from './rust_game_bg';

const TextEncoder = typeof self === 'object' && self.TextEncoder
    ? self.TextEncoder
    : require('util').TextEncoder;

let cachedEncoder = new TextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function passStringToWasm(arg) {
    
    const buf = cachedEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

const TextDecoder = typeof self === 'object' && self.TextDecoder
    ? self.TextDecoder
    : require('util').TextDecoder;

let cachedDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null) {
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    }
    return cachedGlobalArgumentPtr;
}

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

const __wbg_error_2c2dd5f14f439749_target = console.error;

export function __wbg_error_2c2dd5f14f439749(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    
    varg0 = varg0.slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);
    
    __wbg_error_2c2dd5f14f439749_target(varg0);
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
    * @param {string} arg2
    * @returns {World}
    */
    static new(arg0, arg1, arg2) {
        const [ptr2, len2] = passStringToWasm(arg2);
        return World.__construct(wasm.world_new(arg0, arg1, ptr2, len2));
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
    /**
    * @returns {void}
    */
    get_hero_coords() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.world_get_hero_coords(this.ptr);
    }
    /**
    * @param {number} arg0
    * @returns {void}
    */
    tick(arg0) {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return wasm.world_tick(this.ptr, arg0);
    }
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
    * @param {string} arg0
    * @returns {Character}
    */
    static new_hero(arg0) {
        const [ptr0, len0] = passStringToWasm(arg0);
        return Character.__construct(wasm.character_new_hero(ptr0, len0));
    }
    /**
    * @returns {string}
    */
    name() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        const retptr = globalArgumentPtr();
        wasm.character_name(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        
        const realRet = getStringFromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 1);
        return realRet;
        
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
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        
        const realRet = getArrayU32FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 4);
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

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

