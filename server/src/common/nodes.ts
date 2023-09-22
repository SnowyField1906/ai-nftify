import p2pList from "src/config/node-info/p2p-list";

export const THRESHOLD = Math.floor(Object.keys(p2pList).length / 2) + 1;
