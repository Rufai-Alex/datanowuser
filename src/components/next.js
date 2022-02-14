import React, { useHistory } from "react";

function Next({ where }) {
  const History = useHistory();

  return <div>{History.push(where)}</div>;
}

export default Next;
