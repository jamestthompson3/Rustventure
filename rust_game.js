/* tslint:disable */
import * as wasm from './rust_game_bg';

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

