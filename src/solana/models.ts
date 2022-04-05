import { PublicKey } from "@solana/web3.js";
// import BN from "bn.js";

export class Event {
    id?: string;
    eventid?: PublicKey;
    admin?: Uint8Array;
    name: string;
    description: string;
    resolutionDate: string;
    category: string;
    imageLink: string;

    constructor(e: Event) {
        this.admin = e.admin;
        this.name = e.name;
        this.description = e.description;
        this.resolutionDate = e.resolutionDate;
        this.category = e.category;
        this.imageLink = e.imageLink;
    }

    static schema: any = new Map([
        [Event,
            {
                kind: 'struct',
                fields: [
                    ['admin', [32]],
                    ['name', 'string'],
                    ['description', 'string'],
                    ['resolutionDate', 'u64'],
                    ['category', 'string'],
                    ['imageLink', 'string'],
                ]
            }]
    ]);
}
