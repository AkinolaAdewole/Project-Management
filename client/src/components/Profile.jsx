import React from "react";
import { Container, Stack } from "react-bootstrap"; // Importing Bootstrap components for layout and styling
import { Navigate } from "react-router-dom"; // Importing Navigate from React Router for redirection
import Cookies from "js-cookie"; // Importing js-cookie to handle browser cookies
import { useEffect, useState } from "react"; // Importing hooks: useEffect for lifecycle management, useState for state management

// Profile component that takes user and isAuthenticated as props
const Profile = ({ user, isAuthenticated }) => {
  // State to store the token, initialized as null
  const [token, setToken] = useState(null);

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  // useEffect hook to run side-effects when the component mounts
  // This retrieves a token from the cookies and logs it in the console, then saves it in the state
  useEffect(() => {
    const savedToken = Cookies.get("token"); // Get token from cookies
    console.log("Token from cookie:", savedToken); // Log the token for debugging purposes
    setToken(savedToken); // Set the token in the state
  }, []); // The empty dependency array ensures this only runs once on component mount

  // JSX returned by the component to render the profile information
  return (
    <>
      <Container className="my-4">
        <h1 className="mb-3">PROFILE</h1>
        {user && ( // If user data is available, render the profile details
          <Stack style={{ width: "fit-content", margin: "0 auto" }} gap={1}>
            {/* Displaying user's avatar */}
            <Stack direction="horizontal" gap={3}>
              <img
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "100%", // Makes the image circular
                  marginBottom: "100px",
                }}
                src={user.avatar && user.avatar.url} // Display user's avatar if available
                alt="avatar"
              />
            </Stack>
            {/* Display user's name */}
            <Stack direction="horizontal" gap={3}>
              <p className="fw-bold">NAME:</p>
              <p>{user.name}</p>
            </Stack>
            {/* Display user's email */}
            <Stack direction="horizontal" gap={3}>
              <p className="fw-bold">EMAIL:</p>
              <p>{user.email}</p>
            </Stack>
            {/* Display user's phone number */}
            <Stack direction="horizontal" gap={3}>
              <p className="fw-bold">PHONE:</p>
              <p>{user.phone}</p>
            </Stack>
          </Stack>
        )}
      </Container>
    </>
  );
};

export default Profile; // Exporting the Profile component as default
