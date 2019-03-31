extern crate js_sys;

use js_sys::Math;

fn gen_rand_num(num: f64) -> f64 {
    Math::random() * Math::random() * 10. + Math::random() * 200.0 + Math::random() * 150. * Math::random() * 10. - (num + Math::random() * 3.)
}

pub fn gen_rand_coord(num: f64, max: f64) -> u32 {
    let mut rand = gen_rand_num(num);
    if rand > max {
        while rand > max {
            rand = max - rand - gen_rand_num(rand);
        }

    }
    if rand < 0. {
        rand = -rand;
    }
    rand as u32
}
