import Skeleton from "react-loading-skeleton"

const Card = (props) => {
  const { title, text } = props

  return (
    <div className=" bg-blue-100 pl-5 pt-5 rounded-lg h-28 md:h-32 w-full md:w-64 shadow-md hover:shadow-inner opacity-80 hover:opacity-100 min-w-max">
      <div className="text-lg font-bold">{title}</div>
      <div className="mt-2 font-extrabold text-3xl md:text-4xl text-blue-200">
        {text === null ? <Skeleton width="50%" /> : text}
      </div>
    </div>
  )
}

export default Card
