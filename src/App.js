import './App.css';
import { ChatProvider } from './Components/Context';
import ChatbotPage from './Pages/ChatbotPage';
function App() {
  return (
    <div className="App">
      <ChatProvider>
        <ChatbotPage/>
      </ChatProvider>
    </div>
  );
}

export default App;
