import { useLocation } from "react-router-dom";
import { appOfferImage, popularDestinationsImages } from "../assets/helper";

// class="slick-arrow slick-prev"

function AboutSite() {
  const location = useLocation();

  console.log(location);
  return (
    <aside>
      <div className="popular-destinations my-20 ">
        <h2 className="text-2xl w-fit font-semibold max-sm:text-xl border-l-4 border-[#FF4F17] pl-2">
          Popular destinations
        </h2>
        <div className="flex gap-5 flex-wrap max-sm:text-sm max-sm:justify-center mt-10">
          {popularDestinationsImages.map((destinationsCard) => (
            <div
              key={destinationsCard.id}
              className="destination-cards relative text-white "
            >
              <h1 className="absolute bottom-8 left-4 font-bold">
                {destinationsCard.place}
              </h1>
              <p className="absolute bottom-2 left-4 font-bold">
                {destinationsCard.properties}
              </p>
              <img
                className="rounded hover:contrast-125  cursor-pointer max-sm:w-[130px]"
                src={destinationsCard.src}
                alt={destinationsCard.alt}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="app-offer-image my-10 max-sm:hidden max-w-fit cursor-pointer">
        <img src={appOfferImage.src} alt={appOfferImage.alt} />
      </div>
      <div className="text-justify p-2 max-sm:hidden">
        <div className="cleartrip-flight-info ">
          <h3 className=" font-bold text-base py-3">Why Cleartrip?</h3>
          <p>
            It is no longer an uphill battle to get the lowest airfare and book
            tickets online. Cleartrip is all about making travel &nbsp;
            <span className="font-bold ">easy, affordable</span>
            &nbsp; and <span className="font-semibold">simple.</span> From
            <span className="font-semibold">international</span> flights to
            <span className="font-semibold">domestic</span> flights; from early
            morning flights to late night flights, from cheap flights to
            luxurious ones. Cleartrip helps you complete your flight booking in
            just a few clicks. Your online flight booking experience is seamless
            with our features like:
          </p>
          <div className="pt-3">
            <span className="font-semibold">ClearChoice Max:</span>
            &nbsp;
            <span>
              Free cancellation or rescheduling for domestic (up to 24 hrs
              before departure) &amp; international flights (up to 72 hrs before
              departure).
            </span>
          </div>
          <div className="pt-3">
            <span className="font-semibold">ClearChoice Plus:</span>
            &nbsp;
            <span>
              Free date change or airline change up to 12 hrs (up to 24 hours
              for Air India*&amp; Vistara*) before departure.
            </span>
          </div>
          <div className="pt-3">
            <span className="font-semibold">Medi-cancel refund:</span>
            &nbsp;
            <span>
              Cancel your domestic flight booking easily on valid medical
              grounds and get up to ₹3500 against airline cancellation charges
              per passenger per segment.
            </span>
          </div>
          <div className="pt-3">
            <span className="font-semibold">
              International travel insurance:
            </span>
            &nbsp;
            <span>
              Get stress-free coverage against a vast range of uncertainties for
              all international destinations at only ₹89 per user per day.
            </span>
          </div>
          <p>
            And with our{" "}
            <span className="font-semibold">
              round-the-clock customer service,
            </span>{" "}
            we ensure no queries or concerns regarding your flight tickets are
            left unresolved.
          </p>
        </div>
        <div className="pt-8">
          <h3 className="pb-4 font-bold text-base">
            How to search and book cheap flights on Cleartrip?
          </h3>
          <p>
            Looking for flights and booking flight tickets is simple and
            seamless on Cleartrip.
          </p>
          <ul className="px-6 pt-2">
            <li className="pt-1">
              <p>Enter source and destination city/airport</p>
            </li>
            <li className="pt-1">
              <p>Select the date of travel</p>
            </li>
            <li className="pt-1">
              <p>Choose the number of travellers</p>
            </li>
          </ul>
          <div className="m-0 mt-0 mb-0 ml-0 mr-0 mx-0 my-0 pt-4"></div>
          <p>
            Hit enter and there you go! You have a search list of all the
            flights available, sorted according to price. You can further filter
            your search by choosing preferences and filters like time, duration,
            number of stops, and by airlines or even look for other dates simply
            by clicking on the calendar on the right side of the page.
          </p>
        </div>
        <div className="pt-8">
          <h3 className="pb-4 font-bold text-base">
            How to make flexible flight bookings with changeable dates?
          </h3>
          <p>
            While making your flight booking, make sure to select the
            ‘ClearChoice Plus’ or ‘ClearChoice Max’ option before you confirm
            the air ticket. At a minimal cost, this allows you to modify your
            flight booking dates and airlines. So in case of any change in
            plans, Cleartrip has got you covered!
          </p>
        </div>
        <div className="pt-8">
          <h3 className="pb-4 font-bold text-base">
            How to cancel flights online on Cleartrip?
          </h3>
          <p>
            In case you wish to cancel your booking due to any reason, simply -
          </p>
          <ul className="px-6 pt-2">
            <li className="pt-1">
              <p>Select the trip you want to cancel</p>
            </li>
            <li className="pt-1">
              <p>Click on the “Cancellations” link</p>
            </li>
            <li className="pt-1">
              <p>
                Select the passengers to cancel the booking for. Then hit
                “Review cancellation”
              </p>
            </li>
            <li className="pt-1">
              <p>Review passenger selection and refund amount</p>
            </li>
            <li className="pt-1">
              <p>Click on “Yes, cancel now”</p>
            </li>
          </ul>
          <div className="m-0 mt-0 mb-0 ml-0 mr-0 mx-0 my-0 pt-4"></div>
          <p>
            That’s it – you’re done! Sit back and wait for your refund that’s
            guaranteed to be processed within 24 hours.
          </p>
          <p>
            While making your flight booking, select the ‘ClearChoice Max’
            option before you confirm the air ticket, to cancel flight bookings
            without having to pay hefty cancellation charges!
          </p>
        </div>
        <div className="pt-8">
          <h3 className="pb-4 font-bold text-base">
            What are the benefits of booking flights online with Cleartrip?
          </h3>
          <p>
            Get the best flight fares with exciting flight offers on your air
            ticket when you book with Cleartrip. Unmissable sales and deals like
            Travel Max Sale, Big Travel Sale, Cleartrip Tatkaal, etc. offer
            never-seen-before discounts that help you book flights at affordable
            rates. Best flight discounts await you when you book with bank cards
            like ICICI, Bank of Baroda, HDFC, Axis, Kotak etc.
          </p>
        </div>
        <div className="m-0 mt-0 mb-0 ml-0 mr-0 mx-0 my-0 pt-8"></div>
        <h3 className="font-bold text-base">What’s more?</h3>
        <p>
          Flight ticket booking or planning your travel is made simpler with our
          round trip and multicity options. When you hit enter, your search list
          page shows the results for both onward and return in a split screen
          format letting you choose flights in one go for a round trip. The
          multicity search page shows a list of complete itineraries that
          removes the hassle of you calculating time, transfers and layovers
          letting you finish your online flight booking. To ensure you get the
          best price we highlight offers, sales and other promotions on the
          checkout page. Post booking, our portal allows for easy cancellations
          or amendments without having to make calls to the airlines.
        </p>
      </div>
    </aside>
  );
}

export default AboutSite;
