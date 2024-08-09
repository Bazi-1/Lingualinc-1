import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "../Components/style/Designs/homeapp.css";
import "../Components/style/Responsives/ResponsiveHomeApp.css";
import NavBar from "../Components/resuables/NavigationBar.tsx";
import Card from "react-bootstrap/Card";
import Fab from "@mui/material/Fab";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../Redux Management/store";
import { 
  fetchFeedbacks, 
  postFeedback, 
  setFeedbackContent, 
  toggleFeedbackForm, 
  setSessionExpired 
} from "../Redux Management/feedbackSlice.tsx";
import { 
  getLocalStorageUser, 
  clearLocalStorageUser 
} from "../utils/localStorageUtils.ts";


/**
 * FeedbackSection component allows users to view and submit feedback.
 * @returns {React.Component} The FeedbackSection component.
 */
const FeedbackSection = () => {
    const dispatch = useDispatch<AppDispatch>();
    const feedbacks = useSelector((state: RootState) => state.feedback.feedbacks);
    const showFeedbackForm = useSelector((state: RootState) => state.feedback.showFeedbackForm);
    const feedbackContent = useSelector((state: RootState) => state.feedback.feedbackContent);
    const sessionExpired = useSelector((state: RootState) => state.feedback.sessionExpired);
    const loggedInUserId = getLocalStorageUser()?.userId;
  

     /**
     * Effect to fetch feedbacks on component mount.
     */
    useEffect(() => {

      dispatch(fetchFeedbacks());
    }, [dispatch]);
  


     /**
     * Handles showing the feedback form.
     */
    const handleShowFeedbackForm = () => dispatch(toggleFeedbackForm());

    /**
     * Handles closing the feedback form.
     */
    const handleCloseFeedbackForm = () => dispatch(toggleFeedbackForm());

     /**
     * Handles changes in the feedback textarea.
     * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The event object.
     */
    const handleChangeFeedback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(setFeedbackContent(e.target.value));
    };
    
    
    /**
     * Submits the feedback.
    */
    const submitFeedback = () => {
      const loggedInUser = getLocalStorageUser();
      if (loggedInUser && feedbackContent.trim()) {
        console.log(`Submitting feedback id: ${loggedInUser.userId}`);
        console.log(`Submitting feedback: ${feedbackContent}`);
        dispatch(postFeedback({ userId: loggedInUser?.userId, content: feedbackContent }))
          .unwrap()
          .then(() => {
            console.log('Feedback submitted successfully');
            dispatch(setFeedbackContent('')); // Clear the textarea after submission
            dispatch(toggleFeedbackForm()); // Close the feedback form
          })
          .catch((error) => {
            console.error('Failed to submit feedback:', error);
          });
      }
    };

    /**
     * Handles the user logout.
     */
  const handleLogout = () => {
    clearLocalStorageUser();
    dispatch(setSessionExpired(false));
    // Navigate to sign-in page
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
    <div className="trainer_section layout_padding">
      <div className="container">
        <div className="heading_container">
          <h2 style={{ paddingTop: 6 }}>Feedback Section</h2>
          <div style={{ paddingLeft: 10 }}>
            <Fab
              aria-label="edit"
              style={{
                width: 50,
                height: 50,
                color: "white",
                backgroundColor: "#212929",
              }}
              onClick={handleShowFeedbackForm}
            >
              <EditIcon />
            </Fab>
          </div>
        </div>
      </div>

      <div className="container" style={{ width: 700 }}>
        {feedbacks.map((fb, index) => (
          <div
            key={index}
            className="heading_container"
            style={{ paddingTop: "20px" }}
          >
            <Card style={{ backgroundColor: "#212529", width: 700 }}>
              <Card.Header style={{ color: "#ffffff" }}>Feedback</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-1">
                  <p style={{ color: "#fffff0" }}>{fb.content}</p>
                  <footer className="blockquote-footer">
                    {/* {fb.userId} in{" "}
                    <cite title="Source Title">lingualinc</cite> */}
                    {fb.userId ? `${fb.userName}` : 'User ID not available'} in lingualinc
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showFeedbackForm} onHide={handleCloseFeedbackForm} centered>
        <Modal.Body style={{ backgroundColor: "#212929" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#212929" }}>
            <Modal.Title style={{ color: "white" }}>Feedback</Modal.Title>
          </Modal.Header>
          <Form className="mb-7">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="2" style={{ color: "white" }}>
                Name
              </Form.Label>
              <Col sm="7">
                <Form.Control
                  plaintext
                  readOnly
                  defaultValue={getLocalStorageUser()?.userName}
                  style={{ color: "white" }}
                  name="userId"
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm={2} style={{ color: "white" }}>
                Enter your feedback here
              </Form.Label>
              <Col sm="10">
              <Form.Control
      as="textarea"
      rows={6}
      name="content"
      value={feedbackContent} // Changed from feedback to feedbackContent
      onChange={handleChangeFeedback} // Changed from setFeedback to handleChangeFeedback
    />
              </Col>
            </Form.Group>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              style={{ backgroundColor: "#212929" }}
              onClick={submitFeedback}
            >
              Send
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const FeedbackPage = () => {
  return (
    <div className="sub_page">
      <div className="hero_area">
        <header className="header_section">
          <div className="container-fluid">
            <NavBar />
          </div>
        </header>
      </div>

      <FeedbackSection />
    </div>
  );
};

export default FeedbackPage;

 

   





 