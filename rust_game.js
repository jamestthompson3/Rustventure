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

const stack = [];

const slab = [{ obj: undefined }, { obj: null }, { obj: true }, { obj: false }];

function getObject(idx) {
    if ((idx & 1) === 1) {
        return stack[idx >> 1];
    } else {
        const val = slab[idx >> 1];
        
        return val.obj;
        
    }
}

let slab_next = slab.length;

function dropRef(idx) {
    
    idx = idx >> 1;
    if (idx < 4) return;
    let obj = slab[idx];
    
    obj.cnt -= 1;
    if (obj.cnt > 0) return;
    
    // If we hit 0 then free up our space in the slab
    slab[idx] = slab_next;
    slab_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropRef(idx);
    return ret;
}

const __wbg_time_3127089b3be1de08_target = console.time;

const TextDecoder = typeof self === 'object' && self.TextDecoder
    ? self.TextDecoder
    : require('util').TextDecoder;

let cachedDecoder = new TextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

export function __wbg_time_3127089b3be1de08(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_time_3127089b3be1de08_target(varg0);
}

const __wbg_timeEnd_84a125ce239dd100_target = console.timeEnd;

export function __wbg_timeEnd_84a125ce239dd100(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);
    __wbg_timeEnd_84a125ce239dd100_target(varg0);
}

const __wbg_random_66a024bb58194b7c_target = Math.random;

export function __wbg_random_66a024bb58194b7c() {
    return __wbg_random_66a024bb58194b7c_target();
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
    * @returns {Uint32Array}
    */
    get_hero_coords() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        const retptr = globalArgumentPtr();
        wasm.world_get_hero_coords(retptr, this.ptr);
        const mem = getUint32Memory();
        const rustptr = mem[retptr / 4];
        const rustlen = mem[retptr / 4 + 1];
        
        const realRet = getArrayU32FromWasm(rustptr, rustlen).slice();
        wasm.__wbindgen_free(rustptr, rustlen * 4);
        return realRet;
        
    }
    /**
    * @returns {any}
    */
    loot() {
        if (this.ptr === 0) {
            throw new Error('Attempt to use a moved value');
        }
        return takeObject(wasm.world_loot(this.ptr));
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

function addHeapObject(obj) {
    if (slab_next === slab.length) slab.push(slab.length + 1);
    const idx = slab_next;
    const next = slab[idx];
    
    slab_next = next;
    
    slab[idx] = { obj, cnt: 1 };
    return idx << 1;
}

export function __wbindgen_json_parse(ptr, len) {
    return addHeapObject(JSON.parse(getStringFromWasm(ptr, len)));
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

