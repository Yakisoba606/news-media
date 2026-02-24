import { useEffect, useReducer } from "react";
import { createContext } from "react";

const UserContext = createContext();

let AuthenticationReducer = (state,action) =>{

    switch(action.type){
        case 'LOGIN' : 
        // store in browser 
        localStorage.setItem('user', JSON.stringify(action.payload)) //key,value
        return { user : action.payload }

        case 'LOGOUT':
        localStorage.removeItem('user') 
        return { user : null }
        default: return state // current state
    }

} // (state,action)

const UserContextProvider = ( { children } ) => {
    
    let [state,dispatch] = useReducer (AuthenticationReducer, {
        user : null
    }); // function, data

    useEffect (() => {
        let user = JSON.parse(localStorage.getItem('user'))
        if (user) {
            dispatch( { type: 'LOGIN' , payload : user })
        } else {
            dispatch( { type: 'LOGOUT' })
        }
    },[])

    return (
        
        <UserContext.Provider value={{...state, dispatch}} >
            {children}
        </UserContext.Provider>
    )
    
}

export { UserContext , UserContextProvider }