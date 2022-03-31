import React from "react";

function Next({ where }) {
  return <div>{History.push(where)}</div>;
}

export default Next;
