import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router-dom";
import { clearLocalStorageUser } from "../utils/localStorageUtils.ts";
import NavBar from "../Components/resuables/NavigationBar.tsx";

import Alert from "@mui/material/Alert";
import "../Components/style/Designs/translate.css";
// =======================================
import {
  Button,
  TextareaAutosize,
  Paper
} from "@mui/material";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import { VolumeUp } from "@mui/icons-material";
import axios from "axios";
import "../Components/style/Designs/translate.css";
import supportedLanguages from "../Components/resuables/CountryLanguages.ts";


/**
 * TranslationView component provides an interface for text translation.
 * It allows users to select source and target languages and translates the input text.
 * @returns {React.Component} The TranslationView component.
 */
const TranslationView = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("id");
  const navigate = useNavigate();
  const [sessionExpired, setSessionExpired] = useState(false);

  // Logout function
  const handleLogout = () => {
    clearLocalStorageUser();
    navigate("/sign-in"); 
  };

 
  useEffect(() => {
    let logoutTimer;

    const resetLogoutTimer = () => {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => setSessionExpired(true), 600000); 
    };

    document.addEventListener("mousemove", resetLogoutTimer);
    document.addEventListener("keydown", resetLogoutTimer);

    resetLogoutTimer();

    return () => {
      clearTimeout(logoutTimer);
      document.removeEventListener("mousemove", resetLogoutTimer);
      document.removeEventListener("keydown", resetLogoutTimer);
    };
  }, []);



    /**
     * Handles input text changes.
     * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The event object.
     */
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

    /**
     * Performs the translation of the input text.
     */
  const handleTranslate = async () => {
    try {
      const encodedParams = new URLSearchParams();
      encodedParams.set("source_language", sourceLanguage);
      encodedParams.set("target_language", targetLanguage);
      encodedParams.set("text", inputText);

      const options = {
        method: "POST",
        url: "https://text-translator2.p.rapidapi.com/translate",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "70a7e9d646msh1390870405bd41cp1fe75ajsn102d61a49923",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        data: encodedParams,
      };

      const response = await axios.request(options);
      console.log(response.data); 

      
      if (
        response.data &&
        response.data.data &&
        response.data.data.translatedText
      ) {
        setTranslatedText(response.data.data.translatedText);
      } else {
        alert(
          "Received data doesn't have the expected structure. Check the console for details."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Error translating the text");
    }
  };

   /**
     * Handles the pronunciation of the translated text.
     */
  const handlePronunciation = () => {
    if (!translatedText) return;
    if (!window.speechSynthesis) {
      alert("Speech synthesis not supported in this browser.");
      return;
    }

    let utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLanguage; 
    window.speechSynthesis.speak(utterance);
  };

  if (sessionExpired) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={handleLogout}>
            RETURN TO LOGIN PAGE
          </Button>
        }
      >
        Your session has expired
      </Alert>
    );
  }

  return (
    <div className="sub_page">
      <div className="hero_area">
        <header className="header_section">
          <div className="container-fluid">
            <NavBar />
          </div>
        </header>
      </div>
      <div className="trainer_section layout_padding">
        <div className="container">
          <h2>Translate here</h2>
          <div className="translation-container">
            <Paper
              style={{
                backgroundColor: "#212529",
                borderColor: "#212529",
              }}
            >
              <FloatingLabel
                controlId="floatingSelect"
                label="Source Language"
                className="custom-floating-label"
              >
                <Form.Select
                  aria-label="Target Language"
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <TextareaAutosize
                value={inputText}
                onChange={handleInputChange}
                placeholder="Enter text to translate..."
                className="translation-textarea"
              />

              <FloatingLabel
                controlId="floatingSelect"
                label="Target Language"
                className="custom-floating-label"
              >
                <Form.Select
                  aria-label="Target Language"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                >
                  {supportedLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </Form.Select>
              </FloatingLabel>

              <Button
                variant="contained"
                color="primary"
                onClick={handleTranslate}
                className="translation-button"
                style={{
                  backgroundColor: "#212529",
                  borderColor: "#212529",
                }}
              >
                Translate
              </Button>

              <TextareaAutosize
                value={translatedText}
                readOnly 
                className="output-textarea" 
                placeholder="Translated text will appear here..."
              />

             
              <Button
                variant="contained"
                startIcon={<VolumeUp />}
                onClick={handlePronunciation}
                className="pronunciation-button"
                style={{
                  backgroundColor: "#212529",
                  borderColor: "#212529",
                }}
              >
                Pronounce
              </Button>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslationView;
