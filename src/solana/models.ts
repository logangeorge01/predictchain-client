import { PublicKey } from "@solana/web3.js";
// import BN from "bn.js";

export class Event {
    eventid?: PublicKey;
    admin?: Uint8Array;
    name: string;
    description: string;
    resolution_date: string;
    category: string;
    image_link: string;

    constructor(e: Event) {
        this.admin = e.admin;
        this.name = e.name;
        this.description = e.description;
        this.resolution_date = e.resolution_date;
        this.category = e.category;
        this.image_link = e.image_link;
    }

    static schema: any = new Map([
        [Event,
            {
                kind: 'struct',
                fields: [
                    ['admin', [32]],
                    ['name', 'string'],
                    ['description', 'string'],
                    ['resolution_date', 'u64'],
                    ['category', 'string'],
                    ['image_link', 'string'],
                ]
            }]
    ]);
}

