import React, { Suspense } from "react";
const ReactApp = React.lazy(() => import("reactApp/ReactApp"));


export default function App() {
  return (
    <div>
      <h1>Host React</h1>
      <Suspense fallback={<div>Loading Remote Button...</div>}>
        <ReactApp />
      </Suspense>
    </div>
  );
}
