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
  arrows: false,
  autoplaySpeed: 3000,
  pauseOnHover: true,
};

const carouselSettingsForMoreOffers = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  arrows: false,
  autoplaySpeed: 3500,
  pauseOnHover: true,
};

export default function OffersCarousel() {
  return (
    <div>
      <div className="flex flex-col gap-12 max-sm:items-center mb-5">
        <div className="card border-stone-400  w-[300px] max-h-max">
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

        <div className="max-sm:none flex flex-col items-center">
          <h1 className="text-xl font-semibold mb-4">More Offers</h1>
          <div className="w-[270px] h-[145px] border border-grey-400 rounded-xl ">
            <Slider {...carouselSettingsForMoreOffers}>
              {moreOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="p-4 pb-2 mt-2 mb-3 h-[120px] flex flex-col"
                >
                  <h3 className="font-bold">{offer.title}</h3>
                  <p className="mt-4 mb-2">{offer.para}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}
