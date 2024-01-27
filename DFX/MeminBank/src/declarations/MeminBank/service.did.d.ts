import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'checkBalance' : ActorMethod<[], number>,
  'compound' : ActorMethod<[], number>,
  'receiveDollar' : ActorMethod<[number], undefined>,
  'withdrawDollar' : ActorMethod<[number], undefined>,
}
