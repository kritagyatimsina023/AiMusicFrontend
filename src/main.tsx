import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.tsx";
import Navbar from "./components/sections/Navbar.tsx";
import { AuthContextProvider } from "./context/AuthContext.tsx";
import SignInAndSignUpProvider from "./context/SiginAndSignUp.tsx";
import { ParameterProvider } from "./context/InputParaContext.tsx";
import ReviewProvider from "./context/ReviewContext.tsx";
import { PromptProvider } from "./context/PromtContext.tsx";
import { ToggleOutputProvider } from "./context/ToggleOutputContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <AuthContextProvider>
        <SignInAndSignUpProvider>
          <ToggleOutputProvider>
            <ParameterProvider>
              <ReviewProvider>
                <PromptProvider>
                  {/* <div className="w-full relative flex items-center justify-center">
                    <Navbar />
                  </div> */}
                  <App />
                  <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                  />
                </PromptProvider>
              </ReviewProvider>
            </ParameterProvider>
          </ToggleOutputProvider>
        </SignInAndSignUpProvider>
      </AuthContextProvider>
    </Router>
  </StrictMode>,
);
