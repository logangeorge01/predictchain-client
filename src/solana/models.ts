import { PublicKey } from "@solana/web3.js";
// import BN from "bn.js";

export class SolEvent {
   eventid?: PublicKey;
   admin?: Uint8Array;
   description: string;
   starttime: number;
   league: string;
   image0: string;
   image1: string;
   side0: string;
   side1: string;

   constructor(e: SolEvent) {
      this.admin = e.admin;
      this.description = e.description;
      this.starttime = e.starttime;
      this.league = e.league;
      this.image0 = e.image0;
      this.image1 = e.image1;
      this.side0 = e.side0;
      this.side1 = e.side1;
   }

   static schema: any = new Map([
      [SolEvent,
      {
         kind: 'struct',
         fields: [
            ['admin', [32]],
            ['description', 'string'],
            ['starttime', 'u64'],
            ['league', 'string'],
            ['image0', 'string'],
            ['image1', 'string'],
            ['side0', 'string'],
            ['side1', 'string'],
         ]
      }]
   ]);
}

