import * as wasm from './rust_game_bg';

const lTextEncoder = typeof TextEncoder === 'undefined' ? require('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

let WASM_VECTOR_LEN = 0;

let passStringToWasm;
if (typeof cachedTextEncoder.encodeInto === 'function') {
    passStringToWasm = function(arg) {

        let size = arg.length;
        let ptr = wasm.__wbindgen_malloc(size);
        let writeOffset = 0;
        while (true) {
            const view = getUint8Memory().subarray(ptr + writeOffset, ptr + size);
            const { read, written } = cachedTextEncoder.encodeInto(arg, view);
            arg = arg.substring(read);
            writeOffset += written;
            if (arg.length === 0) {
                break;
            }
            ptr = wasm.__wbindgen_realloc(ptr, size, size * 2);
            size *= 2;
        }
        WASM_VECTOR_LEN = writeOffset;
        return ptr;
    };
} else {
    passStringToWasm = function(arg) {

        const buf = cachedTextEncoder.encode(arg);
        const ptr = wasm.__wbindgen_malloc(buf.length);
        getUint8Memory().set(buf, ptr);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    };
}
/**
* @param {number} width
* @param {number} height
* @param {string} hero_name
* @returns {Game}
*/
export function start_game(width, height, hero_name) {
    const ptr2 = passStringToWasm(hero_name);
    const len2 = WASM_VECTOR_LEN;
    return Game.__wrap(wasm.start_game(width, height, ptr2, len2));
}

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

export function __wbg_random_c216f62dd7602115() {
    return Math.random();
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8');

function getStringFromWasm(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
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

export function __wbg_random_28a14a8b9cdf19f7() {
    return Math.random();
}

export function __wbg_error_569d7454c64f6dbe(arg0, arg1) {
    let varg0 = getStringFromWasm(arg0, arg1);

    varg0 = varg0.slice();
    wasm.__wbindgen_free(arg0, arg1 * 1);

    console.error(varg0);
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

export function __wbindgen_json_parse(ptr, len) { return addHeapObject(JSON.parse(getStringFromWasm(ptr, len))); }

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

function freeCharacter(ptr) {

    wasm.__wbg_character_free(ptr);
}
/**
*/
export class Character {

    static __wrap(ptr) {
        const obj = Object.create(Character.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeCharacter(ptr);
    }

    /**
    * @param {number} x
    * @param {number} y
    * @returns {Character}
    */
    static new_enemy(x, y) {
        return Character.__wrap(wasm.character_new_enemy(x, y));
    }
    /**
    * @param {string} name
    * @returns {Character}
    */
    static new_hero(name) {
        const ptr0 = passStringToWasm(name);
        const len0 = WASM_VECTOR_LEN;
        return Character.__wrap(wasm.character_new_hero(ptr0, len0));
    }
    /**
    * @returns {string}
    */
    name() {
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
        return wasm.character_get_class(this.ptr);
    }
    /**
    * @returns {number}
    */
    health() {
        return wasm.character_health(this.ptr);
    }
    /**
    * @param {number} hit
    * @returns {void}
    */
    take_damage(hit) {
        return wasm.character_take_damage(this.ptr, hit);
    }
    /**
    * @param {number} heal
    * @returns {void}
    */
    heal(heal) {
        return wasm.character_heal(this.ptr, heal);
    }
    /**
    * @param {number} width
    * @returns {void}
    */
    move_left(width) {
        return wasm.character_move_left(this.ptr, width);
    }
    /**
    * @param {number} width
    * @returns {void}
    */
    move_right(width) {
        return wasm.character_move_right(this.ptr, width);
    }
    /**
    * @param {number} height
    * @returns {void}
    */
    move_down(height) {
        return wasm.character_move_down(this.ptr, height);
    }
    /**
    * @param {number} height
    * @returns {void}
    */
    move_up(height) {
        return wasm.character_move_up(this.ptr, height);
    }
}

function freeGame(ptr) {

    wasm.__wbg_game_free(ptr);
}
/**
*/
export class Game {

    static __wrap(ptr) {
        const obj = Object.create(Game.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeGame(ptr);
    }
    /**
    * @param {number} event_code
    * @returns {any}
    */
    tick(event_code) {
        return takeObject(wasm.game_tick(this.ptr, event_code));
    }
    /**
    * @returns {number}
    */
    get_world_pixels() {
        return wasm.game_get_world_pixels(this.ptr);
    }
    /**
    * @returns {any}
    */
    get_state() {
        return takeObject(wasm.game_get_state(this.ptr));
    }
    /**
    * @returns {any}
    */
    loot() {
        return takeObject(wasm.game_loot(this.ptr));
    }

}

function freeTreasureChest(ptr) {

    wasm.__wbg_treasurechest_free(ptr);
}
/**
*/
export class TreasureChest {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;
        freeTreasureChest(ptr);
    }

}

export function __wbindgen_object_drop_ref(i) { dropObject(i); }

