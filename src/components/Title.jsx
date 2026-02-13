
function Title({first , second , description}) {
  return (
    <>
       <div className="space-y-1 md:space-y-2">       
        <h1 className="text-2xl font-   bold tracking-wide md:text-3xl lg:text-4xl  flex gap-x-2">
          {first} <span className=" text-sky-900">{second}</span>
        </h1>

        <p className="text-sm   leading-relaxed sm:text-md md:text-lg  tracking-wider  ">
            {description}
        </p>
      </div> 
    </>
  )
}

export default Title
