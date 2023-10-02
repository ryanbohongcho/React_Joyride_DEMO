import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Basic from './Basic';
import Carousel from './Carousel';
import CodeSandboxEdit from './components/CodeSandboxEdit';
import Footer from './components/Footer';
import GitHubRepo from './components/GitHubRepo';
import Controlled from './Controlled';
import CustomComponents from './CustomComponents';
import Modal from './Modal';
import { getScreenSize } from './modules/helpers';
import MultiRoute from './MultiRoute';
import MultiRouteHome from './MultiRoute/routes/Home';
import MultiRouteA from './MultiRoute/routes/RouteA';
import MultiRouteB from './MultiRoute/routes/RouteB';
import NotFound from './NotFound';
import Scroll from './Scroll';

const { NODE_ENV } = process.env;

function App() {
  const [breakpoint, setBreakpoint] = useState(getScreenSize());
  const debounceTimeout = useRef(0);

  
const steps = [
  {
    target: ".step1",
    content: "這是第一步！這是基本的示例。"
  },
  {
    target: ".step2",
    content: "這是第二步！這是旋轉木馬示例。"
  },
  // Add more steps as needed
];
const handleResize = useRef(() => {
    clearTimeout(debounceTimeout.current);

    debounceTimeout.current = window.setTimeout(() => {
      setBreakpoint(getScreenSize());
    }, 250);
  });

  useEffect(() => {
    const { current } = handleResize;

    window.addEventListener('resize', current);

    return () => {
      window.removeEventListener('resize', current);
    };
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Basic breakpoint={breakpoint} />} path="/" />
        <Route element={<Controlled />} path="/controlled" />
        <Route element={<CustomComponents />} path="/custom" />
        <Route element={<Carousel />} path="/carousel" />
        <Route element={<Modal />} path="/modal" />
        <Route element={<MultiRoute />} path="/multi-route">
          <Route element={<MultiRouteHome />} index />
          <Route element={<MultiRouteA />} path="a" />
          <Route element={<MultiRouteB />} path="b" />
        </Route>
        <Route element={<Scroll />} path="/scroll" />
        <Route element={<NotFound />} path="*" />
      </Routes>
      {NODE_ENV === 'production' && <CodeSandboxEdit />}
      {NODE_ENV === 'production' && <GitHubRepo />}
      <Footer />
    </BrowserRouter>
  );
}

export default App;
