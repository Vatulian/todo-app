import React from "react";
import { Link } from "react-router-dom";
class NotFoundPage extends React.Component {
  render() {
    return (
      <>
      <div className="auth-wrapper">
      <div className="auth-inner">
        <p style={{textAlign:"center", fontSize:"32px"}}>Page is not found.</p>
          <p style={{ textAlign: "center", fontSize:"24px"}}>
            <Link to='/'>Go to Login</Link>
          </p>
          </div>
          </div>
      </>
    );
  }
}
export default NotFoundPage;