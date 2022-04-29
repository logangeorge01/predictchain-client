import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";

// don't need the schema part of this anymore because this isn't what's going to blockchain, only database
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
        [Event, {
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

//this is what gets serialized to blockchain
export class EventAccount {
    bumpSeed: number;
    resolveAuthority: Uint8Array;
    yesMintAddress: Uint8Array;
    noMintAddress: Uint8Array;
    volume: BN;

    constructor(e: EventAccount) {
        this.bumpSeed = e.bumpSeed;
        this.resolveAuthority = e.resolveAuthority;
        this.yesMintAddress = e.yesMintAddress;
        this.noMintAddress = e.noMintAddress;
        this.volume = e.volume;
    }

    static schema: any = new Map([
        [EventAccount, {
            kind: 'struct',
            fields: [
                ['bumpSeed', 'u64'],
                ['resolveAuthority', [32]],
                ['yesMintAddress', [32]],
                ['noMintAddress', [32]],
                ['volume', 'u64']
            ]
        }]
    ]);
}
