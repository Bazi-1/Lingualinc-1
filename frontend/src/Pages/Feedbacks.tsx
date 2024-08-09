// import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import "owl.carousel/dist/assets/owl.carousel.css";
// import "owl.carousel/dist/assets/owl.theme.default.css";
// import "../Components/style/Designs/homeapp.css";
// import "../Components/style/Responsives/ResponsiveHomeApp.css";
// import NavBar from "../Components/resuables/NavigationBar.tsx";
// import Card from "react-bootstrap/Card";
// import Fab from "@mui/material/Fab";
// import EditIcon from "@mui/icons-material/Edit";
// import Modal from "react-bootstrap/Modal";
// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import Row from "react-bootstrap/Row";
// import SendIcon from "@mui/icons-material/Send";
// import Button from "@mui/material/Button";
// import { useNavigate } from "react-router-dom";
// import {
//   getLocalStorageUser,
//   clearLocalStorageUser,
// } from "../UTILS/localStorageUtils";
// import feedServices from "../services/feedbackService";
// // import UserService from "../services/UserService";
// import Alert from "@mui/material/Alert";
// const FeedbackSection = () => {
//   const [showFeedbackForm, setShowFeedbackForm] = useState(false);
//   // const [showToast, setShowToast] = useState(true);

//   const handleShowFeedbackForm = () => setShowFeedbackForm(true);
//   const handleCloseFeedbackForm = () => setShowFeedbackForm(false);
//   // const toggleShowToast = () => setShowToast(!showToast);
//   const [feedback, setFeedback] = useState("");
//   const [feedbacks, setFeedbacks] = useState([]); 
//   const loggedInUserId = getLocalStorageUser().user_id;
//   const [sessionExpired, setSessionExpired] = useState(false);

//   const navigate = useNavigate();

//   const handleLogout = () => {
//     clearLocalStorageUser(); 
//     navigate("/sign-in"); 
//   };

//   useEffect(() => {
//     let logoutTimer;

//     const resetLogoutTimer = () => {
//       clearTimeout(logoutTimer);
//       logoutTimer = setTimeout(() => setSessionExpired(true), 600000); 
//     };

//     document.addEventListener("mousemove", resetLogoutTimer);
//     document.addEventListener("keydown", resetLogoutTimer);

//     resetLogoutTimer();

//     return () => {
//       clearTimeout(logoutTimer);
//       document.removeEventListener("mousemove", resetLogoutTimer);
//       document.removeEventListener("keydown", resetLogoutTimer);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchFeedbacks = async () => {
//       try {
//         const response = await feedServices.displayfeedback();
        
//         if (response.data && response.data.length > 0) {
//           setFeedbacks(
//             response.data.map((fbs) => ({
//               userId: fbs.user_name, 
//               content: fbs.content, 
//             }))
//           );
//         }
//       } catch (error) {
//         console.error("Error fetching feedbacks:", error);
//       }
//     };

//     fetchFeedbacks();
//   }, []);

//   const submitFeedback = async () => {
//     try {
//       const response = await feedServices.postfeedback(
//         loggedInUserId,
//         feedback
//       );
//       if (response.status === 200) {
//         setFeedbacks([
//           ...feedbacks,
//           { userId: getLocalStorageUser().user_name, content: feedback },
//         ]);
//         console.log(`feedbacks ${feedbacks.userId} ${feedbacks.content}`);
//         setFeedback(""); 
//         handleCloseFeedbackForm(); 
//       } else {
//         console.error("Failed to submit feedback");
//       }
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//     }
//   };

//   if (sessionExpired) {
//     return (
//       <Alert
//         severity="error"
//         action={
//           <Button color="inherit" size="small" onClick={handleLogout}>
//             RETURN TO LOGIN PAGE
//           </Button>
//         }
//       >
//         Your session has expired
//       </Alert>
//     );
//   }

//   return (
//     <div className="trainer_section layout_padding">
//       <div className="container">
//         <div className="heading_container">
//           <h2 style={{ paddingTop: 6 }}>Feedback Section</h2>
//           <div style={{ paddingLeft: 10 }}>
//             <Fab
//               aria-label="edit"
//               style={{
//                 width: 50,
//                 height: 50,
//                 color: "white",
//                 backgroundColor: "#212929",
//               }}
//               onClick={handleShowFeedbackForm}
//             >
//               <EditIcon />
//             </Fab>
//           </div>
//         </div>
//       </div>

//       <div className="container" style={{ width: 700 }}>
//         {feedbacks.map((fb, index) => (
//           <div
//             key={index}
//             className="heading_container"
//             style={{ paddingTop: "20px" }}
//           >
//             <Card style={{ backgroundColor: "#212529", width: 700 }}>
//               <Card.Header style={{ color: "#ffffff" }}>Feedback</Card.Header>
//               <Card.Body>
//                 <blockquote className="blockquote mb-1">
//                   <p style={{ color: "#fffff0" }}>{fb.content}</p>
//                   <footer className="blockquote-footer">
//                     {fb.userId} in{" "}
//                     <cite title="Source Title">lingualinc</cite>
//                   </footer>
//                 </blockquote>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>

//       <Modal show={showFeedbackForm} onHide={handleCloseFeedbackForm} centered>
//         <Modal.Body style={{ backgroundColor: "#212929" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#212929" }}>
//             <Modal.Title style={{ color: "white" }}>Feedback</Modal.Title>
//           </Modal.Header>
//           <Form className="mb-7">
//             <Form.Group
//               as={Row}
//               className="mb-3"
//               controlId="formPlaintextEmail"
//             >
//               <Form.Label column sm="2" style={{ color: "white" }}>
//                 Name
//               </Form.Label>
//               <Col sm="7">
//                 <Form.Control
//                   plaintext
//                   readOnly
//                   defaultValue={getLocalStorageUser().user_name}
//                   style={{ color: "white" }}
//                   name="userId"
//                 />
//               </Col>
//             </Form.Group>
//             <Form.Group
//               as={Row}
//               className="mb-3"
//               controlId="formPlaintextPassword"
//             >
//               <Form.Label column sm="20" style={{ color: "white" }}>
//                 Enter your feedback here
//               </Form.Label>
//               <Col sm="10">
//                 <Form.Control
//                   as="textarea"
//                   rows={6}
//                   name="content"
//                   value={feedback}
//                   onChange={(e) => setFeedback(e.target.value)}
//                 />
//               </Col>
//             </Form.Group>
//             <Button
//               variant="contained"
//               endIcon={<SendIcon />}
//               style={{ backgroundColor: "#212929" }}
//               onClick={submitFeedback}
//             >
//               Send
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// const FeedbackPage = () => {
//   return (
//     <div className="sub_page">
//       <div className="hero_area">
//         <header className="header_section">
//           <div className="container-fluid">
//             <NavBar />
//           </div>
//         </header>
//       </div>

//       <FeedbackSection />
//     </div>
//   );
// };

// export default FeedbackPage;
