import useWindowSize from 'useHook/widthBrowser'

function useSettingSlide() {
  const [width] = useWindowSize()
  const countSlide = width > 1700 ? 3 : width > 800 ? 2 : 1
  return {
    dots: false,
    // lazyLoad: true,
    infinite: true,
    // centerMode: width > 1700,
    autoplay: true,
    speed: 200,
    slidesToShow: countSlide,
    slidesToScroll: countSlide,
  }
}

export default useSettingSlide
