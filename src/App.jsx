import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

import testimonials from "./reducers/testimonials";

const store = configureStore({
  reducer: { testimonials },
});
const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          {/* <Feedbacks /> */}
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  );
};

export default App;
