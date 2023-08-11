import React from "react";
import { Link } from "react-router-dom";

function ContentButton({ content, location }) {
  return (
    <div className="content--button">
      {content ? (
        <Link to={location} className="">
          {content}
        </Link>
      ) : (
        <Link className="">Load more content</Link>
      )}
    </div>
  );
}

export default ContentButton;
