import { createContext, useContext } from 'react';

export const initialState: InitialState = {points: {}, fill: {}};

export const PointerContext = createContext<InitialState>(initialState);
export const PointerDispatchContext = createContext<Dispatch>(() => {});

export type Dispatch = React.Dispatch<InitialState>;
type InitialState = {
  points: Record<string, number[][]>,
  fill: Record<string, string | undefined>
}

export function reducer(tasks: InitialState, action: InitialState) {
  if (action && Object.keys(action.points).length === 0) return initialState;
  return { points: { ...tasks.points, ...action.points}, fill: { ...tasks.fill, ...action.fill }};
}

export const useStore = () => {
  return useContext(PointerContext);
};

export const useDispatch = () => {
  return useContext(PointerDispatchContext);
};
