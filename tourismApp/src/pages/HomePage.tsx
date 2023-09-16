import PlaceItem from "../components/PlaceItem";

export default function HomePage() {
  return (
    <div>
      {/* Introduction */}
      <div className="max-w-xl mx-auto">
        <h1 className="uppercase">Welcome to</h1>
        <p className="text-4xl font-semibold mt-2 mb-2">Fanilo Tour</p>
        <p>
          If you are looking at blank cassettes on the web, you may be very
          confused at the difference in price. You may see some for as low as
          $.17 each.
        </p>
        <button className="btn-secondary w-1/4">Explore</button>
      </div>

      {/* Popular destination */}
      <div className="mx-auto mt-12 max-w-xl">
        <h1 className="text-2xl font-semibold mt-2 mb-2">Popular Destination</h1>
        <h2>A little description</h2>
        {/* list of top 3 destination */}
        <div>
            <PlaceItem />
            <PlaceItem />
            <PlaceItem />
        </div>
      </div>

      {/* Popular destination */}
      <div className="">
        <h1 className="text-2xl font-semibold mt-2 mb-2">Popular Destination</h1>
        <h2>A little description</h2>
        {/* list of top 3 destination */}
        <div>
            <PlaceItem />
            <PlaceItem />
            <PlaceItem />
        </div>
      </div>
    </div>
  );
}
