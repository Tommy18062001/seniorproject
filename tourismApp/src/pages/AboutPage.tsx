import { useOutletContext } from "react-router-dom";
import team from "../assets/faniloteam.jpg";
import { RiTeamLine } from "react-icons/ri";
import { BiNetworkChart } from "react-icons/bi";
import { HiInformationCircle } from "react-icons/hi";
import Tour from "../components/Tour";

export default function AboutPage() {
  const [isScrolled, setIsScrolled] = useOutletContext();
  setIsScrolled(true);
  return (
    <div className="mt-32 w-4/5 mx-auto relative">
      {/* the title */}
      <h1 className="text-6xl my-8 text-center border border-b-black w-fit pb-4 mx-auto">
        About us
      </h1>

      <section className="w-full text-center mt-24 flex flex-col justify-center items-center">
        <h1 className="my-4 flex flex-col gap-2 items-center">
          <RiTeamLine className="w-12 h-12 text-blue-500" />{" "}
          <span className="text-3xl ">Who We are</span>
        </h1>
        <p className="mb-4 text-sm w-2/3">
          Fanilo tour is tour agency which offers specialized tours of the
          exotic east coast of Madagascar. We are flexible and accommodate
          families with young children, senior travelers, and visitors with
          special needs. We offer private excursions, as well as those for small
          or large groups.
        </p>
        <p className="mb-8 text-sm w-2/3">
          Let us personalize your itinerary, and introduce you to unique flora
          and fauna, and magnificent scenery! Our experienced Malagasy guides
          are fluent in English, French, Italian and German
        </p>
        <img src={team} alt="team" className="w-4/5 h-[350px] object-cover" />
      </section>

      <section className="w-full text-center mt-24 flex flex-col justify-center items-center">
        <h1 className="my-4 flex flex-col gap-2 items-center">
          <BiNetworkChart className="w-12 h-12 text-blue-500" />{" "}
          <span className="text-3xl ">What we do</span>
        </h1>
        <p className="mb-4 text-sm w-2/3">
          Fanilo tour is tour agency which offers specialized tours of the
          exotic east coast of Madagascar. We are flexible and accommodate
          families with young children, senior travelers, and visitors with
          special needs. We offer private excursions, as well as those for small
          or large groups.
        </p>
        <p className="mb-8 text-sm w-2/3">
          Let us personalize your itinerary, and introduce you to unique flora
          and fauna, and magnificent scenery! Our experienced Malagasy guides
          are fluent in English, French, Italian and German
        </p>
        {/* <img src={tree} alt="team" className="w-4/5 h-auto object-cover" /> */}
        <ul className="w-full relative list-none grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Tour
            title="Toamasina Tour"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere,
              velit voluptatem omnis quam voluptatibus quidem ratione dolores
              reiciendis minus"
          />
          <Tour
            title="Canal de Pangalanes"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere,
              velit voluptatem omnis quam voluptatibus quidem ratione dolores
              reiciendis minus"
          />
          <Tour
            title="Ankaninofy"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere,
              velit voluptatem omnis quam voluptatibus quidem ratione dolores
              reiciendis minus"
          />
          <Tour
            title="Iles aux Prunes"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere,
              velit voluptatem omnis quam voluptatibus quidem ratione dolores
              reiciendis minus"
          />
          <Tour
            title="Foulpointe"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere,
              velit voluptatem omnis quam voluptatibus quidem ratione dolores
              reiciendis minus"
          />
          <Tour
            title="Parc Ivoloina"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere,
              velit voluptatem omnis quam voluptatibus quidem ratione dolores
              reiciendis minus"
          />
          <Tour
            title="Palmeraie de l'Ivondro"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere,
              velit voluptatem omnis quam voluptatibus quidem ratione dolores
              reiciendis minus"
          />
          <Tour
            title="Humanitarian visit to orphanage"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere,
              velit voluptatem omnis quam voluptatibus quidem ratione dolores
              reiciendis minus"
          />
        </ul>
      </section>

      <section className="w-full text-center mt-24 flex flex-col justify-center items-center">
        <h1 className="my-4 flex flex-col gap-2 items-center">
          <HiInformationCircle className="w-12 h-12 text-blue-500" />{" "}
          <span className="text-3xl ">Contact Information</span>
        </h1>
        <p className="mb-4 text-sm w-2/3">
          Fanilo tour is tour agency which offers specialized tours of the
          exotic east coast of Madagascar. We are flexible and accommodate
          families with young children, senior travelers, and visitors with
          special needs. We offer private excursions, as well as those for small
          or large groups.
        </p>
        <div className="relative w-full p-2 mt-8 flex gap-4 justify-center">
          {/* Contact form */}
          <div className="w-1/2">
            <div className="flex flex-col items-start">
              <ul className=" text-start">
                <li>Lot 170 parcelle 22/31 Tanamborozano</li>
                <li>johantony@hotmail.com</li>
                <li>034 08 880 10</li>
              </ul>
            </div>
            <form className="mt-8">
              <input type="text" placeholder="Name" name="name" required />
              <input type="email" placeholder="Email" name="email" required />
              <input type="text" placeholder="Subject" name="subject" />
              <textarea name="message"></textarea>
              <input
                type="submit"
                value="Send"
                className="btn-primary cursor-pointer"
              />
            </form>
          </div>
          {/* Map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7582.151981709474!2d49.39379803639575!3d-18.160413014442867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x21f50031040daf03%3A0xb45d4ec9b2579ea1!2sTanamborozano%2C%20Toamasina!5e0!3m2!1sfr!2smg!4v1695015186302!5m2!1sfr!2smg"
            width="600"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="border border-gray-400"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
