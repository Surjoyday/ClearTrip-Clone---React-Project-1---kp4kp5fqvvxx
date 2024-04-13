import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { moreOffers, offersCardsImages } from "../assets/helper";

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1700,
  pauseOnHover: true,
};

const carouselSettingsForMoreOffers = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
};

export default function OffersCarousel() {
  return (
    <div className="flex flex-col gap-20">
      <div className="card border-stone-400  w-[300px] max-sm:w-full">
        <Slider {...carouselSettings}>
          {offersCardsImages.map((card) => (
            <img
              key={card.id}
              src={card.url}
              alt={card.alt}
              width="260px"
              height="204px"
              className="w-[300px] h-[200px] object-fill max-sm:object-contain"
            />
          ))}
        </Slider>
      </div>
      <div className="w-[300px] border border-gray-300 rounded">
        <Slider {...carouselSettingsForMoreOffers}>
          {moreOffers.map((offer) => (
            <div
              key={offer.id}
              className=" p-4 mb-4 h-[200px] w-[234px] flex flex-col gap-5 flex-wrap"
            >
              <h3 className="font-bold">{offer.title}</h3>
              <p className="mt-8">{offer.para}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
