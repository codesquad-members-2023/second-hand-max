import ActionType from '@constants/ActionType';
import { createContext, useReducer } from 'react';
import Product from 'types/Product';

type AppState = {
  products: Product[];
  detail: Product | null;
  modal: null | 'REGION';
};

type Action =
  | {
      type: ActionType.DETAIL;
      payload: Product;
    }
  | {
      type: ActionType.CLOSE;
    }
  | {
      type: ActionType.REGION;
    };

type AppStateDispatchContext = {
  dispatch: React.Dispatch<Action>;
};

export const AppStateContext = createContext<AppState | null>(null);
export const AppStateDispatchContext =
  createContext<React.Dispatch<Action> | null>(null);

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ActionType.DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case ActionType.CLOSE:
      return {
        ...state,
        detail: null,
        modal: null,
      };

    case ActionType.REGION:
      return {
        ...state,
        modal: 'REGION',
      };
  }
};

const initialState: AppState = {
  products: [
    {
      itemId: 0,
      thumbnailUrl: 'http:~~',
      title: '잎사귀 포스터',
      tradingRegion: '역삼 1동',
      createdAt: '2023-08-22T14:14:32',
      price: 59000,
      status: '판매중',
      chatCount: 0,
      wishCount: 1,
    },
  ],
  detail: null,
  modal: 'REGION',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppStateDispatchContext.Provider value={dispatch}>
        {children}
      </AppStateDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
