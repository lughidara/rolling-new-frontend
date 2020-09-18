import React from 'react';
import CardCategoria from './CardCategoria';

import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import SwiperCore, { Navigation, A11y, EffectFade } from 'swiper';
import 'swiper/components/navigation/navigation.scss';
import { Link } from "react-router-dom";


SwiperCore.use([Navigation, A11y, EffectFade]);

const NoticiasCategorias = () => {
    return (
        <div className="mb-3">
            <Link exact={true} to="/*" className="text-decoration-none">
                <h4 className="titulo-categoria card-titulo">Categoria</h4>
            </Link>
            <hr className="bg-dark"></hr>

            <Swiper
                spaceBetween={20}
                slidesPerView={3}
                navigation
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
                loop={true}
                breakpoints={{
                    //cuando el  ancho de la ventana es mayor o igual que 280
                    280: {
                        width: 165,
                        slidesPerView: 1,
                    },

                    320: {
                        width: 192,
                        slidesPerView: 1,
                    },

                    360: {
                        width: 218,
                        slidesPerView: 1,
                    },
                    375: {
                        width: 228,
                        slidesPerView: 1,
                    },
                    414: {
                        width: 254,
                        slidesPerView: 1,
                    },
                    768: {
                        width: 490,
                        slidesPerView: 2,
                    },
                    992: {
                        width: 639,
                        slidesPerView: 3,
                    },
                    1200: {
                        width: 880,
                        slidesPerView: 3,
                    }
                }}
            >
                {/* aca deberia ir una funcion map */}
                <SwiperSlide>
                    <CardCategoria></CardCategoria>
                </SwiperSlide>
                <SwiperSlide>
                    <CardCategoria></CardCategoria>
                </SwiperSlide>
                <SwiperSlide>
                    <CardCategoria></CardCategoria>
                </SwiperSlide>
                <SwiperSlide>
                    <CardCategoria></CardCategoria>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default NoticiasCategorias;