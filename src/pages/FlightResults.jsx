import { useSearchParams } from "react-router-dom";

function FlightResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const departDate = searchParams.get("depart_date");
  const travelClass = searchParams.get("travel_class");
  const seats = searchParams.get("seats");

  console.log(source);
  console.log(destination);
  console.log(departDate);
  console.log(travelClass);
  console.log(seats);

  console.log(new Date(departDate).getUTCDay());

  return <div>FILGHT RESULT</div>;
}

export default FlightResults;
