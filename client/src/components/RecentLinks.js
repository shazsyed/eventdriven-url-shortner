import { Link } from "react-router-dom"
import eyeIcon from "../images/eye.png"
import config from "../utils/config"

const RecentLinks = (props) => {
  const links = props.links


  return (
    <div className="flex flex-col gap-2 w-full mt-4">
      {links.map((link) => {
        return (
          <div className="flex bg-blue-100 w-full p-5 rounded-md justify-between items-center">
            <div className="text-lg">{config.SHORT_LINK_HOST}{link.slug}</div>
            <div className="flex">
              <Link  to={`/track/${link.slug}`}>
              <img className="hover:scale-110 hover:cursor-pointer transistion-all ease-in-out delay-100" alt="view-link" src={eyeIcon} width="30px" height="20px" />
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RecentLinks
