export default function OffersCard({ offerCardData }) {
  return (
    <>
      <div className="offer-card mt-10 flex gap-10 max-sm:p-5 flex-wrap">
        {offerCardData.map((offers) => (
          <div
            key={offers._id}
            className="flex flex-col flex-wrap border-1 rounded-[6px] border-gray-500 shadow-md"
          >
            <img
              src={offers.newHeroUrl}
              alt={`${offers.type}-img`}
              className="w-[250px] h-[250px] max-sm:w-[150px] max-sm:h-[150px] object-cover rounded-t-[4px]"
            />

            <p className="max-w-[250px] max-sm:max-w-[150px] max-sm:text-xs mt-3  p-2">
              <span className="font-semibold">{offers.pTl}</span>
              <span> {offers.pTx}</span>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
