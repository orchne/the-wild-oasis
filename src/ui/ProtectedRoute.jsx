import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  background-color: var(--color-grey-50);
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load authenticated user
  const { isLoading, isAuthenticated, fetchStatus } = useUser();

  // 2. if there is no authenticated user, refirect to /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading && fetchStatus === "fetching")
      navigate("/login");
  }, [isAuthenticated, isLoading, navigate, fetchStatus]);

  // 3. while loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. if there is a user, render the app

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
