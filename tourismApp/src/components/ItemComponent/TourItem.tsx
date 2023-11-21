export default function TourItem({ title, description }) {
  const titleLength = title.length;
  console.log(titleLength);
  return (
    <>
      <li
        className="border border-gray-500 px-4 py-2 w-full text-left cursor-pointer relative 
        transition-all ease-in duration-200 hover:bg-[#242526] hover:text-white
          before:absolute before:bg-white before:h-[2px] before:hover:animate-borderAnimation before:hover:w-[50px]"
      >
        <h1 className="font-bold mb-2"> {title} </h1>
        <p className=" text-sm">{description}</p>
      </li>
    </>
  );
}
