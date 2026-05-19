import { useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const useProductSwiper = (products, onViewAll) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [showNavigation, setShowNavigation] = useState(true);

  // Responsive breakpoints for Swiper
  const breakpoints = {
    320: { 
      slidesPerView: 1, 
      spaceBetween: 10,
      slidesPerGroup: 1 
    },
    400: { 
      slidesPerView: 2, 
      spaceBetween: 10,
      slidesPerGroup: 2 
    },
    640: { 
      slidesPerView: 3, 
      spaceBetween: 10,
      slidesPerGroup: 3 
    },
    768: { 
      slidesPerView: 4, 
      spaceBetween: 10,
      slidesPerGroup: 4 
    },
    1024: { 
      slidesPerView: 5, 
      spaceBetween: 10,
      slidesPerGroup: 5 
    },
  };

  const handleViewAll = useCallback(() => {
    if (onViewAll) {
      onViewAll();
    }
    console.log("View all clicked");
  }, [onViewAll]);

  // Check if navigation should be visible
  const checkNavigationVisibility = useCallback(() => {
    if (swiperInstance) {
      // Hide navigation if only the View All card is visible
      const shouldHide = products.length === 0;
      setShowNavigation(!shouldHide);
    }
  }, [swiperInstance, products.length]);

  // Update navigation visibility when swiper initializes or slides change
  const onSwiperInit = useCallback((swiper) => {
    setSwiperInstance(swiper);
    checkNavigationVisibility();
  }, [checkNavigationVisibility]);

  const onSlideChange = useCallback(() => {
    checkNavigationVisibility();
  }, [checkNavigationVisibility]);

  // Swiper configuration
  const swiperConfig = {
    modules: [Navigation, Pagination],
    navigation: showNavigation, // Dynamically enable/disable navigation
    pagination: { 
      clickable: true,
      dynamicBullets: true, // Optional: makes bullets dynamic/smaller when not active
    },
    spaceBetween: 10,
    breakpoints,
    className: "product-swiper",
    slidesPerGroup: 1,
    slidesPerGroupAuto: true,
    slidesPerGroupSkip: 0,
    onSwiper: onSwiperInit,
    onSlideChange: onSlideChange,
    onInit: onSwiperInit,
  };

  // Render function for the swiper with products
  const renderSwiper = (ProductComponent, ViewAllCardComponent) => (
    <div className="relative w-full">
      <Swiper {...swiperConfig}>
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductComponent
              name={product.name}
              price={product.price}
              description={product.description}
              stock={product.stock}
            />
          </SwiperSlide>
        ))}

        {/* View All Slide */}
        <SwiperSlide>
          <ViewAllCardComponent onClick={handleViewAll} />
        </SwiperSlide>
      </Swiper>

      <style type="text/css">{`
          .product-swiper .swiper-button-next,
          .product-swiper .swiper-button-prev {
            background: white !important;
            width: 30px;
            height: 30px;
            padding: 10px;
            border-radius: 10%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            z-index: 50 ;
            color: #0891b2 !important; /* cyan-600 */
            transition: opacity 0.3s ease;
          }

          /* Hide navigation when showNavigation is false */
          ${!showNavigation ? `
            .product-swiper .swiper-button-next,
            .product-swiper .swiper-button-prev {
              display: none !important;
            }
          ` : ''}

          .product-swiper .swiper-button-next:after,
          .product-swiper .swiper-button-prev:after {
            font-size: 16px;
            color: #0891b2 !important; /* cyan-600 */
          }

          /* Disable navigation buttons when disabled */
          .product-swiper .swiper-button-disabled {
            opacity: 0.35 !important;
            cursor: auto !important;
            pointer-events: none !important;
          }

          /* Pagination styling - cyan-600 color and larger size */
          .product-swiper .swiper-pagination-bullet {
            width: 10px;
            height: 10px;
            background: #cbd5e1 !important; /* slate-300 for inactive */
            opacity: 1;
            transition: all 0.3s ease;
          }

          .product-swiper .swiper-pagination-bullet-active {
            background: #0891b2 !important; /* cyan-600 for active */
            width: 12px;
            height: 12px;
          }

          /* If you want the bullets to be even larger on desktop */
          @media (min-width: 768px) {
            .product-swiper .swiper-pagination-bullet {
              width: 12px;
              height: 12px;
            }
            
            .product-swiper .swiper-pagination-bullet-active {
              width: 14px;
              height: 14px;
            }
          }

          /* Optional: Add spacing below the swiper for pagination */
          .product-swiper {
            padding-bottom: 40px !important;
          }

          /* If using dynamic bullets */
          .product-swiper .swiper-pagination-bullet-active-prev,
          .product-swiper .swiper-pagination-bullet-active-next {
            transform: scale(0.8);
          }

          .product-swiper .swiper-pagination-bullet-active-prev-prev,
          .product-swiper .swiper-pagination-bullet-active-next-next {
            transform: scale(0.6);
          }
      `}</style>
    </div>
  );

  return {
    renderSwiper,
    handleViewAll,
    breakpoints,
    showNavigation
  };
};