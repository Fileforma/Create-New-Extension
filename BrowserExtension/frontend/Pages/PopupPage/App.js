import React, { lazy, Suspense } from 'react';
import { Routes, Route} from 'react-router-dom';

const App = () => {
  return(
    <><div>
      <a href="#/"> Home</a>
      <a href="#/about"> About</a>
    </div>
    <Routes>
      <Route path="#/" element={<h1>aaa</h1>} />
      <Route index element={<h1>ddd</h1>} />
    </Routes>
    </>
  )
};

export default App;
