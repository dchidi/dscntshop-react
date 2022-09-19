import React, { createContext, useState, useEffect } from "react";
import { INIT_DATA_API } from "../Endpoints";
// Initialize context data that will be shared by multiple components without functions

const defaultData = {
  isLoggedIn: false,
  isAdmin: false,
  isSuperAdmin: false,
  isVerified: false,
  userInfo: {},
  cart: [],
  filters: [],
  filtersValue: [],
  search: [],
  settings: [],
};

const local_storage = JSON.parse(localStorage.getItem("userinfo"));

// add to initData, various functions to be exposed to other components
const initData = {
  ...defaultData, // spread the initData object
  ...local_storage, // spread any data from localstorage. If it already exist in default, update it
  updateContext: (ctx) => {}, // this function only helps for auto completion from other components. Reason for an empty return value
};

// create a global context and pass the data object or array to be shared
const DscntshopContext = createContext(initData);

// Create a component that will be wrapped round components that wishes to share data from the global context and explicitly export it
export function DscntshopContextProvider(props) {
  // useState to manage update of data in the global context and reloading affected components
  const [data, setData] = useState(initData);

  //   This function call the setData function from useState
  function updateContext(ctx) {
    setData((prev) => ctx);
  }

  //   create an object to be passed as value into the component provided by createContext. Exposes all functions that the other
  // components should have access to as well as properties
  const context = {
    ...data,
    updateContext: updateContext,
  };

  // Load default data from DB
  useEffect(() => {
    fetch(INIT_DATA_API)
      .then((response) => response.json())
      .then((actualData) => {
        // if status is 200
        if (actualData.status === 200) {
          // update global context values
          const ctxData = {
            ...data,
            filters: actualData.filters,
          };
          // localStorage.removeItem("userinfo");
          localStorage.setItem("userinfo", JSON.stringify(ctxData));
          setData(ctxData);
        }
        // Catch errors here
        else {
          console.log(actualData.msg);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [data]);

  //   return the component created by createContext with the props that have all the exposed functions and properties of the global context.
  // Also use the props.children to allow wrapping of other components inside this component
  return (
    <DscntshopContext.Provider value={context}>
      {props.children}
    </DscntshopContext.Provider>
  );
}

// export the global context as the default

export default DscntshopContext;
