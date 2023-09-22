import createKeccakHash from "keccak";
import JsonStringify from "json-stable-stringify";

export function keccak256(a) {
    const hash = createKeccakHash("keccak256").update(a).digest().toString("hex");
    return `0x${hash}`;
}

export const thresholdSame = (arr, t) => {
    const hashMap = {};
    for (let i = 0; i < arr.length; i += 1) {
        const str = JsonStringify(arr[i]);
        hashMap[str] = hashMap[str] ? hashMap[str] + 1 : 1;
        if (hashMap[str] === t) {
            return arr[i];
        }
    }
    return undefined;
};

export const kCombinations = (s, k) => {
    let set = s;
    if (typeof set === "number") {
        set = Array.from({ length: set }, (_, i) => i);
    }
    if (k > set.length || k <= 0) {
        return [];
    }

    if (k === set.length) {
        return [set];
    }

    if (k === 1) {
        return set.reduce((acc, cur) => [...acc, [cur]], []);
    }

    const combs = [];
    let tailCombs = [];

    for (let i = 0; i <= set.length - k + 1; i += 1) {
        tailCombs = kCombinations(set.slice(i + 1), k - 1);
        for (let j = 0; j < tailCombs.length; j += 1) {
            combs.push([set[i], ...tailCombs[j]]);
        }
    }
    return combs;
};