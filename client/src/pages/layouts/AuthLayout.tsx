import { Outlet, useLocation } from "react-router-dom";
import FullScreenCard from "../../components/FullScreenCard";
import Link from "../../components/Link";

function AuthLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // Outlet is a placeholder for the child route
  return (
    <FullScreenCard>
      <FullScreenCard.Body>
        <Outlet />
      </FullScreenCard.Body>
      <FullScreenCard.BelowCard>
        {isLoginPage ? (
          <Link to="/signup">Don't have an account? Sign up</Link>
        ) : (
          <Link to="/login">Already have an account? Log in</Link>
        )}
      </FullScreenCard.BelowCard>
    </FullScreenCard>
  );
}

export default AuthLayout;
