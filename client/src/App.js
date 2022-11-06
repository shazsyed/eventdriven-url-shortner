import Home from "./pages/Home"
import TrackLink from "./pages/TrackLink"
import NotFound from "./pages/NotFound"
import { ToastContainer } from "react-toastify"
import { Routes, Route } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
import { SkeletonTheme } from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

function App() {
  return (
    <>
      <div className="font-montserrat md:px-80 p-5 md:py-5 h-screen">
        <SkeletonTheme
          baseColor="#00a3ff33"
          highlightColor="#96c7ff"
          borderRadius="0.5rem"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/track/:slug" element={<TrackLink />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SkeletonTheme>
        <ToastContainer position="bottom-left" autoClose={5000} />
      </div>
    </>
  )
}

export default App
