// const P = 1000000;

// const r = 10.5 / 12 / 100;

// const n = 10 * 12;

// const E = P * r * (Math.pow(1+r, n)) /  (Math.pow(1 + r, n) - 1);

// E

/// list

let p = 5000;
let t = 1;
let r = 16;
let remi = 16  / 12 / 100;
let emi = p * remi * (Math.pow(1+remi, t*12)) /  (Math.pow(1 + remi, t*12) - 1);

for (let i = t  * 12; i >= 1 ; i --)
{

    let ri = (p * r) / (100 * 12);
    
    let rp = emi - (p * r) / (100 * 12);  

    console.log(ri, emi, rp);

    p = p - rp;
}

