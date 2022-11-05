import { useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useQuery } from "react-query"
import { getAnalytics } from "../api/API"
import Card from "../components/Card"
import WorldMap from "react-svg-worldmap"
import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"
import BrowserBarChart from "../components/BrowserBarChart"
import Table from "../components/Table"
import config from "../utils/config"
import { Link } from "react-router-dom"
import NotFound from "./NotFound"

const TrackLink = (props) => {
  const mapElement = useRef(null)
  const [mapSize, setMapSize] = useState(0)
  const [mapData, setMapData] = useState([])
  const [topDevices, setTopDevices] = useState([])
  const [topSocials, setTopSocials] = useState([])
  const [topSources, setTopSources] = useState([])
  const { slug } = useParams()

  const { data, isError, isLoading } = useQuery(
    ["analytics", slug],
    () => getAnalytics(slug),
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  )

  useEffect(() => {
    setMapSize(mapElement.current.offsetWidth)
  }, [])

  useEffect(() => {
    if (!isError && data?.countries) {
      const mapArr = []
      for (const [key, value] of Object.entries(data.countries)) {
        if (key !== "UNKNOWN") {
          mapArr.push({ country: key, value: value })
        }
      }
      setMapData(mapArr)
    }
    if (!isError && data?.devices) {
      data?.devices && setTopDevices(createTableData("devices"))
      data?.socials && setTopSocials(createTableData("socials"))
      data?.sources && setTopSources(createTableData("sources"))
    }
  }, [data, isError])

  const createTableData = (type) => {
    const result = []
    for (const [key, value] of Object.entries(data[type])) {
      result.push({ source: key, clicks: value })
    }
    return result
  }

  return isError ? (
    <NotFound />
  ) : (
    <div className="flex flex-col">
      <div className="font-extrabold text-2xl md:text-3xl text-blue-200">
        TRACK <span className="text-black">LINK</span>
      </div>
      <Link to="/">
        <div className="mt-5 w-fit text-lg font-semibold cursor-pointer hover:-translate-y-1 transition ease-in-out delay-150">
          &lt;&lt; Home
        </div>
      </Link>
      <div className="w-full max-h-max p-6 md:p-8 rounded-md shadow-md mt-2 bg-white bg-opacity-60">
        <div className="font-bold text-lg md:text-2xl tracking-wide">
          {data ? (
            `${config.SHORT_LINK_HOST}${data.slug}`
          ) : (
            <Skeleton count={2} />
          )}
        </div>
        <div className="text-black text-sm md:text-base opacity-50 md:mt-2">
          {data && data.url}
        </div>
      </div>
      <div className="flex flex-col md:flex-row self-center mt-10 gap-5 w-full">
        <Card
          title="Total Clicks"
          text={isLoading ? null : data?.clicks ? data.clicks : 0}
        />
        <Card
          title="Unique Devices"
          text={
            isLoading
              ? null
              : data?.devices
              ? Object.keys(data.devices).length
              : 0
          }
        />
        <Card
          title="Unique Sources"
          text={
            isLoading
              ? null
              : data?.sources
              ? Object.keys(data.sources).length
              : 0
          }
        />
      </div>
      <div className="mt-5 md:mt-10 w-full flex flex-col md:flex-row justify-between">
        <div className="shadow-md p-5">
          <div className="md:min-w-[550px]" ref={mapElement}>
            <WorldMap
              color="#00A3FF"
              backgroundColor="#F7F7F7"
              frame={true}
              frameColor="grey"
              value-suffix="Clicks"
              size={mapSize}
              data={mapData}
            />
          </div>
        </div>
        <div className="md:min-w-[550px] min-h-[250px] shadow-md p-5 rounded">
          {data && <BrowserBarChart browsers={data?.browsers} />}
        </div>
      </div>
      <div className="mt-10 w-full flex flex-col md:flex-row gap-5">
        <div className="p-5 shadow-md">
          <div className="font-semibold border-b-2 border-blue-200">
            Top Social Media
          </div>
          <Table
            capitalize={true}
            headers={["Platform", "Clicks"]}
            data={topSocials}
          />
        </div>
        <div className="p-5 shadow-md">
          <div className="font-semibold border-b-2 border-blue-200">
            Top Sources
          </div>
          <Table headers={["Host", "Clicks"]} data={topSources} />
        </div>
        <div className="p-5 shadow-md">
          <div className="font-semibold border-b-2 border-blue-200">
            Top Devices
          </div>
          <Table
            capitalize={true}
            headers={["Device", "Clicks"]}
            data={topDevices}
          />
        </div>
      </div>
    </div>
  )
}

export default TrackLink
