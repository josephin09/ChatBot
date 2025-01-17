import React, { useState, useContext } from "react";
import "./Menu.css";
import logo from "../Assets/ai-logo.png";
import EditIcon from "../Assets/edit.png";
import ChatContext from "../Components/Context";
import { RiDeleteBinFill } from "react-icons/ri";
const Menu = ({ handleNewChat, setChatIndex }) => {
    const {activeConversation, setActiveConversation, conversations, setConversations } = useContext(ChatContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const handleChat = (index) => {
        return () => {
            setActiveConversation(conversations[index]);
            localStorage.setItem("activeConversation",JSON.stringify(activeConversation));
            setChatIndex(index);
            setMenuOpen(false);
        };
    };
    const handleDelete = (index) => {
        const chatHistory = JSON.parse(localStorage.getItem("chatHistory"));
        chatHistory.splice(index, 1);
        console.log(chatHistory);
        localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
        setConversations(chatHistory);
        setActiveConversation([]);
        localStorage.setItem("activeConversation",JSON.stringify([]));
    }

    const handleNewChatAction = () => {
        handleNewChat()
        setMenuOpen(false);
    }
    return (
        <div>
            <div className="menu">
                <div className="new-chat-btn" onClick={handleNewChatAction}>
                    <img style={{ width: "32px", height: "32px" }} src={logo} alt="img" />
                    <div className="new-chat-text">New Chat</div>
                    <img className="edit-icon" src={EditIcon} alt="" />
                </div>
                <div className="conversation-list">
                    {conversations.map((conversation, index) => (
                        <div key={index} className="conversation-item">
                            <div 
                                style={{cursor:"pointer"}} 
                                onClick={handleChat(index)}>
                                Conversation {index + 1}
                            </div>
                            <RiDeleteBinFill 
                                style={{cursor:"pointer"}} 
                                onClick={() => handleDelete(index)}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className="menu-mobile-screen">
                <div className="menu-navbar">
                    <div className="menu-icon" onClick={toggleMenu}>
                        <div className="bar"></div>
                        <div className="bar"></div>
                        <div className="bar"></div>
                    </div>
                    <div className="app-title">Bot AI</div>
                </div>
                {menuOpen && (
                    <div className="menu-mobile-view">
                        <div className="new-chat-btn" onClick={handleNewChatAction}>
                            <img style={{ width: "32px", height: "32px" }} src={logo} alt="img" />
                            <div className="new-chat-text">New Chat</div>
                            <img className="edit-icon" src={EditIcon} alt="" />
                        </div>
                        <div className="conversation-list">
                            {conversations.map((conversation, index) => (
                                <div key={index} className="conversation-item">
                                    <div className="" style={{cursor:"pointer"}} onClick={handleChat(index)}>
                                        Conversation {index + 1}
                                    </div>
                                    <RiDeleteBinFill style={{cursor:"pointer"}} onClick={() => handleDelete(index)}/>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Menu;