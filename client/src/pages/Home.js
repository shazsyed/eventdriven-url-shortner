import { useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
import copyIcon from "../images/content-copy.svg"
import analyticIcon from "../images/poll.svg"
import Icon from "../components/Icon"
import { useMutation } from "react-query"
import { createShortLink } from "../api/API"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { toast } from "react-toastify"
import makeToast from "../utils/makeToast"
import config from "../utils/config"
import { Link } from "react-router-dom"
import RecentLinks from "../components/RecentLinks"

const Home = () => {
  const [recentLinks, setRecentLinks] = useLocalStorage("recentLinks", [])
  const [url, setUrl] = useState("")
  const {
    mutateAsync: createLink,
    data,
    isLoading,
    isSuccess,
  } = useMutation(createShortLink, {
    onSuccess: (data, variables, context) => {
      setRecentLinks((links) =>
        links.length === 5
          ? [data.data, ...links.slice(0, -1)]
          : [...links, data.data]
      )
    },
  })

  const copiedToast = () =>
    toast.info("Copied to clipboard", { toastId: "copied" })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await makeToast(
      createLink({ url: url }),
      "Creating Link",
      "Link Created",
      "An error has occured, please try again"
    )
  }

  return (
    <div className="flex flex-col h-full bg-white items-center justify-center relative">
      <section className="flex flex-col items-center justify-center">
        <span className="font-extrabold text-3xl md:text-4xl">
          SHORTN<span className="text-blue-200">ER</span>
        </span>
        <div className="mt-10 flex flex-col md:flex-row gap-4 md:gap-2 flex-wrap items-center justify-center min-w-full">
          <input
            className="input-field h-14 md:min-w-[478px]"
            type="text"
            placeholder="Enter URL to short"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="short-btn md:h-full active:bg-opacity-60 active:text-black transition ease-out"
            disabled={isLoading}
          >
            SHORT IT!
          </button>
        </div>
        {data && isSuccess && (
          <div className="flex flex-col md:flex-row justify-between items-center bg-blue-100 w-full h-18 md:h-20 p-5 mt-4 rounded-md">
            <CopyToClipboard
              onCopy={() => copiedToast()}
              text={`${config.SHORT_LINK_HOST}${data.data.slug}`}
            >
              <span className="text-lg md:text-2xl font-semibold mx-auto">
                {`${config.SHORT_LINK_HOST}${data.data.slug}`}
              </span>
            </CopyToClipboard>
            <div className="hidden md:flex-row md:flex justify-end gap-2 md:h-full h-8 ml-4">
              <CopyToClipboard
                onCopy={() => copiedToast()}
                text={`${config.SHORT_LINK_HOST}${data.data.slug}`}
              >
                <span className="h-full w-full">
                  <Icon icon={copyIcon} alt="copy" />
                </span>
              </CopyToClipboard>
              <Link className="w-full h-full" to={`/track/${data.data.slug}`}>
                <Icon icon={analyticIcon} alt="analytic" />
              </Link>
            </div>
          </div>
        )}
        <div className="self-start w-full mt-8">
          <div className="flex flex-row justify-between items-center">
            <div className="font-semibold border-b-2 border-blue-200 max-w-fit">
              Recent Links
            </div>
            {recentLinks.length !== 0 && (
              <button
                className="font-semibold py-1 px-2 bg-blue-100 text-sm rounded"
                onClick={() => setRecentLinks([])}
              >
                Clear All
              </button>
            )}
          </div>
          {recentLinks.length === 0 && <div className="mt-20 text-center font-bold text-lg text-blue-200">Seems like you don't have any recent links</div>}
          <RecentLinks links={recentLinks} />
        </div>
      </section>
    </div>
  )
}

export default Home
