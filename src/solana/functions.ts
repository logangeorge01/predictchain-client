import { WalletContextState } from '@solana/wallet-adapter-react';
import { serialize } from 'borsh';
import {
    SystemProgram,
    Transaction,
    PublicKey,
    Connection,
    Keypair
} from '@solana/web3.js';
import { EventAccount } from './models';
import BN from 'bn.js';
import {
    createInitializeMintInstruction, 
    getMinimumBalanceForRentExemptMint,
    MINT_SIZE,
    TOKEN_PROGRAM_ID
} from '@solana/spl-token';

const PROGRAMID = new PublicKey(process.env.REACT_APP_SOLANA_PROGRAM!);

export async function createEvent(connection: Connection, wallet: WalletContextState): Promise<string> {
    const eventAccount = Keypair.generate();
    const yesMintAccount = Keypair.generate();
    const noMintAccount = Keypair.generate();
    const [ mintAuthority, bumpSeed ] = await PublicKey.findProgramAddress([PROGRAMID.toBuffer()], PROGRAMID);

    const newEvent = new EventAccount({
        bumpSeed,
        resolveAuthority: wallet.publicKey!.toBuffer(),
        yesMintAddress: yesMintAccount.publicKey.toBuffer(),
        noMintAddress: noMintAccount.publicKey.toBuffer(),
        volume: new BN(0)
    });

    let eventData = serialize(EventAccount.schema, newEvent);
    const lamports = await connection.getMinimumBalanceForRentExemption(eventData.length);

    const createEventAccount = SystemProgram.createAccount({
        fromPubkey: wallet.publicKey!,
        newAccountPubkey: eventAccount.publicKey,
        lamports,
        space: eventData.length,
        programId: PROGRAMID
    });

    const mintlamports = await getMinimumBalanceForRentExemptMint(connection);

    const createYesAccount = SystemProgram.createAccount({
        fromPubkey: wallet.publicKey!,
        newAccountPubkey: yesMintAccount.publicKey,
        lamports: mintlamports,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID
    });

    const createNoAccount = SystemProgram.createAccount({
        fromPubkey: wallet.publicKey!,
        newAccountPubkey: noMintAccount.publicKey,
        lamports: mintlamports,
        space: MINT_SIZE,
        programId: TOKEN_PROGRAM_ID
    });

    const createYesMint = createInitializeMintInstruction(
        yesMintAccount.publicKey,
        9,
        mintAuthority,
        null
    );

    const createNoMint = createInitializeMintInstruction(
        noMintAccount.publicKey,
        9,
        mintAuthority,
        null
    );

    const transaction = new Transaction();
    transaction.add(
        createEventAccount,
        createYesAccount,
        createNoAccount,
        createYesMint,
        createNoMint
    );
    transaction.feePayer = wallet.publicKey!;
    let hash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = hash.blockhash;

    const signature = await wallet.sendTransaction(transaction, connection, {
        signers: [eventAccount, yesMintAccount, noMintAccount]
    });

    console.log('DONE!');

    return eventAccount.publicKey.toString();
}

