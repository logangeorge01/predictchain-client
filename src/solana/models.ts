import { PublicKey } from "@solana/web3.js";
// import BN from "bn.js";

export class SolEvent {
   eventid?: PublicKey;
   admin?: Uint8Array;
   description: string;
   resolvedate: number;
   category: string;
   image: string;

   constructor(e: SolEvent) {
      this.admin = e.admin;
      this.description = e.description;
      this.resolvedate = e.resolvedate;
      this.category = e.category;
      this.image = e.image;
   }

   static schema: any = new Map([
      [SolEvent,
      {
         kind: 'struct',
         fields: [
            ['admin', [32]],
            ['description', 'string'],
            ['resolvedate', 'u64'],
            ['category', 'string'],
            ['image', 'string'],
         ]
      }]
   ]);
}

