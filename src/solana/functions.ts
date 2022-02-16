import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { getPhantomWallet } from '@solana/wallet-adapter-phantom';
import { deserialize, serialize } from 'borsh';
import {
   Connection,
   SystemProgram,
   Transaction,
   PublicKey,
   TransactionInstruction
} from '@solana/web3.js';
import { SolEvent } from './models';
import BN from 'bn.js';
import { PROGRAMID } from '../PROGRAMID';

const cluster = 'https://api.devnet.solana.com';
// const cluster = 'http://localhost:8899';
const connection = new Connection(cluster, 'confirmed');
const network = WalletAdapterNetwork.Devnet;
const wallet = getPhantomWallet({ network }).adapter;

export async function getAllEvents(): Promise<SolEvent[]> {
   let accounts = await connection.getProgramAccounts(PROGRAMID);
   let events: SolEvent[] = [];
   accounts.forEach(pda => {
      try {
         let eventdata: SolEvent = deserialize(SolEvent.schema, SolEvent, pda.account.data);
         events.push({
            admin: eventdata.admin,
            eventid: pda.pubkey,
            description: eventdata.description,
            starttime: (eventdata.starttime as any as BN).toNumber(),
            league: eventdata.league,
            image0: eventdata.image0,
            image1: eventdata.image1,
            side0: eventdata.side0,
            side1: eventdata.side1
         } as SolEvent);
      } catch (err) {
         // console.log(err);
      }
   });
   return events.sort((a: SolEvent, b: SolEvent) => a.starttime - b.starttime);
}

//100
export async function createEvent(event: SolEvent) {
   // event = new SolEvent({
   //    description: 'Alabama vs Georgia',
   //    starttime: 1641866400000,
   //    league: 'College Football',
   //    image0: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/333.png&h=208&w=208',
   //    image1: 'https://a1.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/61.png&h=208&w=208'
   // })

   await checkWallet();

   const seed = 'abcdef' + Math.random().toString();
   let newAccount = await PublicKey.createWithSeed(
      wallet.publicKey!,
      seed,
      PROGRAMID
   );

   event.admin = wallet.publicKey!.toBuffer();

   let data = serialize(SolEvent.schema, event);
   let ixdata = new Uint8Array([100, ...data]);

   const lamports = await connection.getMinimumBalanceForRentExemption(data.length);
   // console.log(data.length);
   const createProgramAccount = SystemProgram.createAccountWithSeed({
      fromPubkey: wallet.publicKey!,
      basePubkey: wallet.publicKey!,
      seed,
      newAccountPubkey: newAccount,
      lamports: lamports,
      space: data.length,
      programId: PROGRAMID,
   });

   const instruction = new TransactionInstruction({
      keys: [
         { pubkey: newAccount, isSigner: false, isWritable: true },
         { pubkey: wallet.publicKey!, isSigner: true, isWritable: false }
      ],
      programId: PROGRAMID,
      data: Buffer.from(ixdata),
   });

   try {
      const trans = await setPayerAndBlockhashTransaction(
         [createProgramAccount, instruction]
      );
      const signature = await signAndSendTransaction(trans);
      const result = await connection.confirmTransaction(signature);
      console.log('end sendMessage', result);
   } catch (_) {}
}

//101
export async function resolveEvent(eventid: PublicKey) {

}



// HELPER FUNCTIONS - should probably have their own file

async function checkWallet() {
   if (!wallet.connected) {
      await wallet.connect();
   }
}

async function setPayerAndBlockhashTransaction(instructions: TransactionInstruction[]) {
   const transaction = new Transaction();
   instructions.forEach(ix => {
      transaction.add(ix);
   });
   transaction.feePayer = wallet.publicKey!;
   let hash = await connection.getRecentBlockhash();
   transaction.recentBlockhash = hash.blockhash;
   return transaction;
}

async function signAndSendTransaction(transaction: Transaction) {
   try {
      console.log('start signAndSendTransaction');
      let signedTrans = await (wallet as any).signTransaction(transaction);
      console.log('signed transaction');
      let signature = await connection.sendRawTransaction(
         signedTrans.serialize()
      );
      console.log('end signAndSendTransaction');
      return signature;
   } catch (err) {
      console.log('signAndSendTransaction error', err);
      throw err;
   }
}

