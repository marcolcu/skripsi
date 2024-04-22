import { useAppContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardVenue = ({ events }) => {
  const eventsArray = events && Array.isArray(events) ? events : [];
  const router = useRouter();
  const { state } = useAppContext();
  const sliderRef = useRef(null);

  const checkLogin = (eventId) => {
    if (state?.token === null) {
      router.push("/login");
      toast.error("Please login first");
    } else {
      router.push(`/venue/${eventId}`);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Menampilkan 4 slide sekaligus
    slidesToScroll: 1,
    swipeToSlide: true, // Mengizinkan swipe untuk menggeser slide
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev(); // Fungsi untuk menggeser ke slide sebelumnya
  };

  const goToNext = () => {
    sliderRef.current.slickNext(); // Fungsi untuk menggeser ke slide berikutnya
  };

  return (
    <div>
      <Slider className="mt-4" ref={sliderRef} {...settings}>
        {eventsArray.map((event, index) => (
          <button
            key={index}
            className="group relative inline-block px-4"
            onClick={() => checkLogin(event.id)}
            style={{ minWidth: "200px" }} // Lebar minimum setiap item
          >
            <div className="w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 group-hover:cursor-pointer lg:h-80">
              <img
                src={
                  event.imageUrl !== null
                    ? event.imageUrl
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                }
                alt={event.name}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <span>{event.name}</span>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{event.location}</p>
              </div>
            </div>
          </button>
        ))}
      </Slider>
      {eventsArray.length > 4 && (
        <div className="flex justify-end">
          <button
            className="bg-cyan-50 hover:bg-cyan-100 p-3 m-2 rounded-lg"
            onClick={goToPrev}
          >
            Prev
          </button>
          <button
            className="bg-cyan-50 hover:bg-cyan-100 p-3 m-2 rounded-lg"
            onClick={goToNext}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default CardVenue;
