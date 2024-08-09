import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, InputAdornment, IconButton, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import NavBar from '../Components/resuables/NavigationBar.tsx';

// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#4fc3f7',
    },
    background: {
      default: '#0d101b',
      paper: '#13161f',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
    divider: '#222639',
  },
});
 
type Message = {
  role: 'user' | 'system';
  content: string;
};


/**
 * Bots component to display and interact with a chatbot.
 * @returns {React.Component} The Bots component.
 */
const Bots = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');

    try {
      const options = {
        method: 'POST',
        url: 'https://open-ai21.p.rapidapi.com/conversationmpt',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '70a7e9d646msh1390870405bd41cp1fe75ajsn102d61a49923', // Replace with your actual key
          'X-RapidAPI-Host': 'open-ai21.p.rapidapi.com'
        },
        data: {
          messages: [userMessage],
          web_access: false
        }
      };

      const response = await axios.request(options);
      const aiMessage: Message = { role: 'system', content: response.data.result || "I didn't get that." };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { role: 'system', content: 'An error occurred. Please try again.' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: theme.palette.background.default }}>
        <AppBar position="static" style={{ backgroundColor: theme.palette.background.paper }}>
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1, color: theme.palette.text.primary }}>
              ChatGPT 4
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="sm" style={{ overflowY: 'auto', flex: 1, marginTop: theme.spacing(2) }}>
          {messages.map((message, index) => (
            <Typography key={index} style={{ color: theme.palette.text.primary, textAlign: 'left' }}>
              {message.content}
            </Typography>
          ))}
        </Container>

        <div style={{ padding: theme.spacing(2) }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Message ChatGPT..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" style={{ color: theme.palette.primary.main }} onClick={handleSendMessage}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            style={{ background: theme.palette.background.paper, borderRadius: 4 }}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};






/**
 * Bot component to display the bot page with NavBar and Bots components.
 * @returns {React.Component} The Bot component.
 */
const Bot = () => {
    return (
      <div className="sub_page">
        <div className="hero_area">
          <header className="header_section">
            <div className="container-fluid">
              <NavBar />
            </div>
          </header>
        </div>
  
        <Bots />
      </div>
    );
  };
  
  
//   export default Host;

export default Bot;
