import React, {createContext, useContext, useReducer} from "react";
export const DataLayer = createContext(null);

export const DataProvider = ({reducer, initialState,children}) => (
    <DataLayer.Provider value={useReducer(reducer, initialState)}>
        {children}
    </DataLayer.Provider>
);

export const useDataLayer = () => useContext(DataLayer);