import { createContext } from "react";

// Creates a Context object named AppContext.
// This will be used to share data across the component tree without passing props down manually at every level.
export const AppContext = createContext();

// The AppContextProvider component is defined here.
// This component will wrap around any components that need access to the context.
const AppContextProvider = (props) => {
  // The value object represents the data that will be shared across the components that consume this context.
  // Currently, it's an empty object, but you can add any state or functions here to be accessible globally.
  const value = {};

  return (
    <>
      {/* The Provider component makes the context value available to any components that are wrapped inside it */}
      <AppContext.Provider value={value}>
        {/* props.children refers to the child components that are wrapped by AppContextProvider */}
        {props.children}
      </AppContext.Provider>
    </>
  );
};

// Exports the AppContextProvider component to be used in other parts of the application.
export default AppContextProvider;
