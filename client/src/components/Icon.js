const Icon = (props) => {
  return (
    <div className="h-full w-full">
      <img
        className="h-full w-full hover:scale-110 hover:cursor-pointer transistion-all ease-in-out delay-100"
        src={props.icon}
        alt={props.alt}
      />
    </div>
  )
}

export default Icon
