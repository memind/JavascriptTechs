export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'checkBalance' : IDL.Func([], [IDL.Float64], ['query']),
    'compound' : IDL.Func([], [IDL.Float64], []),
    'receiveDollar' : IDL.Func([IDL.Float64], [], ['oneway']),
    'withdrawDollar' : IDL.Func([IDL.Float64], [], ['oneway']),
  });
};
export const init = ({ IDL }) => { return []; };
