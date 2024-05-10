import React, { useState, useEffect, useContext, useRef } from "react";
import "./Field.css";
import QnACard from "../Components/QnACard";
import ChatContext from "../Components/Context";
import logo from "../Assets/ai-logo.png";

const Field = ({ handleChatSave }) => {
    const { activeConversation, setActiveConversation } = useContext(ChatContext);
    const [question, setQuestion] = useState("");
    const conversationData = require("../Data/Conversations.json");
    const chatFieldRef = useRef(null);
    useEffect(() => {
        const savedActiveConversation = JSON.parse(localStorage.getItem("activeConversation")) || [];
        setActiveConversation(savedActiveConversation);
        setTimeout(scrollToBottom, 0);
    }, [setActiveConversation]);

    useEffect(() => {
        scrollToBottom();
    }, [activeConversation]);

    const scrollToBottom = () => {
        if (chatFieldRef.current) {
            chatFieldRef.current.scrollTop = chatFieldRef.current.scrollHeight;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim() !== "") {
            let answer = conversationData.find((que) => que.question.toLowerCase() === question.toLowerCase()) || null;
            if (answer === null) {
                answer = conversationData.find((que) => que.question.toLowerCase().includes(question.toLowerCase())) || { response: "Add some more details to understand" };
            }
            const newConversation = { question: question, answer: answer.response, rating : 0, feedback : ""};
            setActiveConversation([...activeConversation, newConversation]);
            setQuestion("");
            localStorage.setItem("activeConversation", JSON.stringify([...activeConversation, newConversation]));
            setTimeout(scrollToBottom, 0);
        }
    };

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };
    const handleRatingChange = (index, rating) => {
        const updatedConversations = [...activeConversation];
        updatedConversations[index].rating = rating;
        setActiveConversation(updatedConversations);
        localStorage.setItem("activeConversation", JSON.stringify(updatedConversations));
        
    };
    const handleFeedbackData = (index, feedback) => {
        const updatedConversations = [...activeConversation];
        updatedConversations[index].feedback = feedback;
        setActiveConversation(updatedConversations);
        localStorage.setItem("activeConversation", JSON.stringify(updatedConversations));
    }
    return (
        <div className="chat-qna-response">
            <div className="chat-field" ref={chatFieldRef}>
                <div className="app-title">Bot AI</div>
                <div className="app-hero-section">
                    <div className="hero-section-text">How Can I Help You Today?</div>
                    <img src={logo} alt="logo-ai" />
                </div>

                {activeConversation.map((conversation, index) => (
                    <div key={index}>
                        <QnACard key={index + 1} question={conversation.question} isQuestion={true} />
                        <QnACard 
                            key={index + 2} 
                            answer={conversation.answer} 
                            ratingVal ={conversation.rating} 
                            feedbackVal = {conversation.feedback}
                            index={index} 
                            handleRatingChange ={handleRatingChange} 
                            handleFeedbackData={handleFeedbackData}
                        />
                    </div>
                ))}
            </div>
            <form className="input-field" onSubmit={handleSubmit}>
                <input
                    className="input-value"
                    type="text"
                    placeholder="Message BOT AI"
                    value={question}
                    onChange={handleQuestionChange}
                />
                <button className="action-button" type="submit">Ask</button>
                <button className="action-button" type="button" onClick={handleChatSave}>Save</button>
            </form>
        </div>
    );
};

export default Field;