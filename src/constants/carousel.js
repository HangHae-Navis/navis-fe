export const settings = {
  dots: false, // 개수 표시 점
  infinite: false, // 무한 캐러셀
  speed: 100, // 다음 컨텐츠 까지의 속도
  slidesToScroll: 1, // 스크롤 시 넘어가는 컨텐츠 수
  draggable: true, // 드래그
  fade: false, // 사라졌다 나타나는 효과
  arrows: true, // 좌,우 버튼
  initialSlide: 0, // 첫 컨텐츠 번호
  responsive: [
    // 반응형 옵션
    {
      breakpoint: 3000,
      settings: {
        slidesToShow: 4,
        arrows: true,
      },
    },
    {
      breakpoint: 1000, // (숫자)px 이하일 경우
      settings: {
        slidesToShow: 3,
        arrows: true,
      },
    },
    {
      breakpoint: 800, // (숫자)px 이하일 경우
      settings: {
        slidesToShow: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 800, // (숫자)px 이하일 경우
      settings: {
        slidesToShow: 2,
        arrows: true,
      },
    },
    {
      breakpoint: 600, // (숫자)px 이하일 경우
      settings: {
        slidesToShow: 1,
        arrows: true,
      },
    },
  ],
};
