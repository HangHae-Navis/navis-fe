export const settings = {
  dots: false,
  infinite: false,
  speed: 100,
  slidesToShow: 4,
  slidesToScroll: 1,
  draggable: true,
  fade: false,
  arrows: true,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 3000,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
