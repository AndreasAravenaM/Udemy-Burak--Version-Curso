import { Routes } from "react-router-dom";

function App() {
  return (
    <>
      <box minH={"100h"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </box>
    </>
  );
}

export default App;
