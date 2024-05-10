import React, { createContext, useState } from "react";
const Context = createContext();
export const ChatProvider = ({children}) => {
    const [activeConversation, setActiveConversation] = useState([]);
    const [conversations, setConversations] = useState([]);
    return(
        <Context.Provider value={{activeConversation, setActiveConversation, conversations, setConversations}}>
            {children}
        </Context.Provider>
    )
}
export default Context;