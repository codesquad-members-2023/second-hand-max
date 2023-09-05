import ActionType from '@constants/ActionType';
import ModalType from '@constants/ModalType';
import { createContext, useReducer } from 'react';

type AppState = {
  detail: number | null;
  modal: ModalType;
  history: AppState[];
};

type Action =
  | {
      type: ActionType.DETAIL;
      payload: number;
    }
  | {
      type: ActionType.CLOSE;
    }
  | {
      type: ActionType.MODAL;
      payload: ModalType;
    }
  | {
      type: ActionType.BACK;
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
        history: [...state.history, state],
      };

    case ActionType.CLOSE:
      return {
        ...state,
        detail: null,
        modal: ModalType.NULL,
        history: [...state.history, state],
      };
    case ActionType.MODAL:
      return {
        ...state,
        detail: null,
        modal: action.payload,
      };
    case ActionType.BACK: {
      const prev = state.history.length
        ? state.history[state.history.length - 1]
        : null;

      return prev ? { ...prev } : { ...state };
    }
  }
};

const initialState: AppState = {
  detail: null,
  modal: ModalType.NULL,
  history: [],
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
