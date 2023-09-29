export default function BookingTrip() {
    function bookTrip() {
        return;
      }
    return (
        <div className="p-4 shadow shadow-gray-500 rounded-2xl">
          <div className="flex justify-between mb-8">
            <p><span className="font-bold">4.9</span> stars rating</p>
            <p className="text-xl font-bold">
              Price: <span>200$</span>
            </p>
          </div>
          <form onSubmit={bookTrip}>
            <div className="mb-4 text-md">
              <label className="block">Date</label>
              <input className="outline-none" type="date" name="appointmentDate" required />
            </div>
            <div className="mb-4">
              <label>Number of guests</label>
              <input type="number" name="guestCount" />
            </div>
            <button className="btn-primary w-full mx-auto my-4">Book Trip</button>
          </form>
        </div>
    )
}