import { Outlet } from "react-router-dom";
import FullScreenCard from "../../components/FullScreenCard";

function AuthLayout() {
  // Outlet is a placeholder for the child route
  return (
    <FullScreenCard>
      <FullScreenCard.Body>
        <Outlet />
      </FullScreenCard.Body>
      <FullScreenCard.BelowCard>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
      </FullScreenCard.BelowCard>
    </FullScreenCard>
  );
}

export default AuthLayout;
