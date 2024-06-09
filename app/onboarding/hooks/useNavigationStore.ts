import { useReducer } from 'react'

type CounterState = { navigationState: number }

type CounterAction = { type: 'continue' } | { type: 'back' }

interface NavigationStore {
    navigationState: number
    next: () => void
    back: () => void
}

export function useNavigationStore(): NavigationStore {
    const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
        switch (action.type) {
            case 'continue':
                return { navigationState: state.navigationState + 1 }
            case 'back':
                return { navigationState: state.navigationState - 1 }
            default:
                return state
        }
    }
    const initialState: CounterState = { navigationState: -1 }

    const [state, dispatch] = useReducer(counterReducer, initialState)

    return {
        navigationState: state.navigationState,
        next: () => dispatch({ type: 'continue' }),
        back: () => dispatch({ type: 'back' }),
    }
}
