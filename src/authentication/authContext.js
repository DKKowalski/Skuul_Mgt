// import { createContext, useContext, useReducer } from "react";

// const AuthContext = createContext();

// const initialState = { user: null, isAuthenticated: false };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "login":
//       return { ...state, user: action.payload, isAuthenticated: true };
//     case "logout":
//       return initialState;

//     default:
//       throw new Error("Unkown action");
//   }
// };

// const FAKE_USER = {
//   name: "Jack",
//   email: "jack@example.com",
//   password: "qwerty",
// };

// function AuthProvider({ children }) {
//   const [{ user, isAuthenticated }, dispatch] = useReducer(
//     reducer,
//     initialState
//   );
//   const login = (email, password) => {
//     if (email === FAKE_USER.email && password === FAKE_USER.password)
//       dispatch({ type: "login", payload: FAKE_USER });
//   };
//   const logout = () => {
//     dispatch({ type: "logout" });
//   };

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) throw new Error("Context used out of scope");
//   return context;
// }

// export { AuthProvider, useAuth };
import { createContext, useContext, useReducer } from "react";
import { getDocuments } from "../api/api"; // Import the getDocuments function from your Firebase API file

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const login = async (userType, email, password) => {
    try {
      // Query the Firestore collection based on user type and email
      const users = await getDocuments(userType); // Assuming the collection name is the same as the user type (e.g., admins, students, teachers)
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Dispatch login action if user is found
        dispatch({ type: "login", payload: { userType } });
      } else {
        console.error("User not found or invalid credentials");
        throw new Error("User not found or invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in: ", error);
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("Context used out of scope");
  return context;
}

export { AuthProvider, useAuth };
