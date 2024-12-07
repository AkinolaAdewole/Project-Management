import React from "react";
import { Container, Stack } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Profile = ({ user, isAuthenticated }) => {
  const [token, setToken] = useState(null);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  useEffect(() => {
    const savedToken = Cookies.get("token");
    console.log("Token from cookie:", savedToken);
    setToken(savedToken);
  }, []);
  
  return (
    <>
      <Container className="my-4">
        <h1 className="mb-3">PROFILE</h1>
        {user && (
          <Stack style={{ width: "fit-content", margin: "0 auto" }} gap={1}>
            <Stack direction="horizontal" gap={3}>
              <img
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "100%",
                  marginBottom: "100px",
                }}
                src={user.avatar && user.avatar.url}
                alt="avatar"
              />
            </Stack>
            <Stack direction="horizontal" gap={3}>
              <p className="fw-bold">NAME:</p>
              <p>{user.name}</p>
            </Stack>
            <Stack direction="horizontal" gap={3}>
              <p className="fw-bold">EMAIL:</p>
              <p>{user.email}</p>
            </Stack>
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

export default Profile;
