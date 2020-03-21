import React, { createContext, useContext, useReducer } from 'react';
import type { Context, Node } from 'react';

type Props = {
    reducer: Function,
    initialState: Object,
    children: Node
}

export const StateContext: Context<Object> = createContext({});

export const StateProvider = ({ reducer, initialState, children }: Props) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    { children }
  </StateContext.Provider>
);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useGlobalState = () => useContext(StateContext);