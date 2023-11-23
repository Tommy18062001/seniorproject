import { Link } from "react-router-dom";

interface ServiceItemInterface {
  Icon: React.ElementType,
  title: string,
  description: string
}

export default function ServiceItem({Icon, title, description}:ServiceItemInterface) {
  return (
    <Link to={"/"} className="flex flex-col items-start justify-start w-full h-full mb-2 max-w-sm relative gap-2">
      <Icon className="w-8 h-8" />
      <h1>{title}</h1>
      <p className="text-sm text-gray-500 mt-4 text-start">
        {description}
      </p>
    </Link>
  );
}
