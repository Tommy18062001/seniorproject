import { useOutletContext } from "react-router-dom";
import team from "../assets/faniloteam.jpg";
import tree from '../assets/tree-removedbg.png'
import {RiTeamLine} from 'react-icons/ri'
import { BiNetworkChart } from "react-icons/bi";

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useOutletContext();
  setIsScrolled(true);
  return (
    <div className="mt-32 w-3/4 mx-auto relative">
      {/* the title */}
      <h1 className="text-6xl my-8 text-center border border-b-black w-fit pb-4 mx-auto">
        About us
      </h1>

      <section className="w-full text-center mt-24 flex flex-col justify-center items-center">
          <h1 className="my-4 flex flex-col gap-2 items-center"><RiTeamLine className="w-12 h-12 text-blue-500" /> <span className="text-3xl ">Who We are</span></h1>
          <p className="mb-4 text-sm w-2/3">
            Fanilo tour is tour agency which offers specialized tours of the
            exotic east coast of Madagascar. We are flexible and accommodate
            families with young children, senior travelers, and visitors with
            special needs. We offer private excursions, as well as those for
            small or large groups.
          </p>
          <p className="mb-8 text-sm w-2/3">
            Let us personalize your itinerary, and introduce you to unique flora
            and fauna, and magnificent scenery! Our experienced Malagasy guides
            are fluent in English, French, Italian and German
          </p>
          <img src={team} alt="team" className="w-4/5 h-[350px] object-cover" />
        </section>

        <section className="w-full text-center mt-24 flex flex-col justify-center items-center">
        <h1 className="my-4 flex flex-col gap-2 items-center"><BiNetworkChart className="w-12 h-12 text-blue-500" /> <span className="text-3xl ">What we do</span></h1>
          <p className="mb-4 text-sm w-2/3">
            Fanilo tour is tour agency which offers specialized tours of the
            exotic east coast of Madagascar. We are flexible and accommodate
            families with young children, senior travelers, and visitors with
            special needs. We offer private excursions, as well as those for
            small or large groups.
          </p>
          <p className="mb-8 text-sm w-2/3">
            Let us personalize your itinerary, and introduce you to unique flora
            and fauna, and magnificent scenery! Our experienced Malagasy guides
            are fluent in English, French, Italian and German
          </p>
          {/* <img src={tree} alt="team" className="w-4/5 h-auto object-cover" /> */}
          <ul className="w-full relative list-none">
            <li className="">this is it</li>
            <li className="">this is it</li>
            <li className="">this is it</li>
            <li className="">this is it</li>

          </ul>
        </section>

    </div>
  );
}
