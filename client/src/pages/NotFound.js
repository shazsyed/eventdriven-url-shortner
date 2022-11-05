import NotFoundImage from "../images/notfound.gif"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <h1 className="font-semibold text-7xl">404</h1>
      <img className="h-auto md:h-[400px] p-0" alt="stone-age" src={NotFoundImage}></img>
      <div className="text-center">
        <div className="font-semibold text-2xl">Look like you're lost</div>
        <div className="mt-2">
          the page you are looking for is not available!
        </div>
      </div>
      <Link to="/">
        <div className="font-bold mt-10 border-b-2">Return to home page</div>
      </Link>
    </div>
  )
}

export default NotFound
