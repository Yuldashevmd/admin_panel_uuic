import { Button } from "antd";
import { Link, useRouteError } from "react-router-dom";

function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div
      className="d-flex flex-column justify-center align-center"
      style={{ height: "100vh" }}
    >
      <h1 style={{ fontSize: "74px" }}>{error?.status}</h1>
      <h2>{error.data?.sorry}</h2>
      <h2 className="m-y-2">Oops! something went wrong mate...</h2>
      <Link to="/" className="m-y-2">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
export default ErrorBoundary;
