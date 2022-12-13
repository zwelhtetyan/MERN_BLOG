import { useReducer, createContext, useContext } from 'react';

const AuthContext = createContext({
   user: null,
   dispatch: () => {},
});

const initialAuthState = {
   user: JSON.parse(localStorage.getItem('user')) || null,
};

const authReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN':
         return { user: action.payload };
      case 'LOGOUT': {
         return { user: null };
      }
      default:
         return state;
   }
};

const AuthContextProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, initialAuthState);

   return (
      <AuthContext.Provider value={{ ...state, dispatch }}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContextProvider;

// use context
export const useAuthContext = () => useContext(AuthContext);
