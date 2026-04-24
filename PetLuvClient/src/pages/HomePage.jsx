import { Link } from 'react-router-dom';
import { Carousel } from '../components';
import CategoryList from '../components/HomePage/CategoryList';
import ServiceCardList from '../components/common/ServiceCardList';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useDispatch, useSelector } from 'react-redux';
import { getServices } from '../redux/thunks/serviceThunk';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const HomePage = () => {
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.services.loading);
  const services = useSelector((state) => state.services.services);
  const error = useSelector((state) => state.services.error);

  useEffect(() => {
    dispatch(getServices({ pageIndex: 1, pageSize: 10 }));

    if (error) {
      toast.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-12">

      {/* HERO */}
      <section className="grid lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-md">
          <Carousel />
        </div>

        {/* CTA CARD */}
        <div className="bg-gradient-to-br from-secondary to-primary rounded-2xl p-6 text-center flex flex-col justify-between shadow-lg">
          <div>
            <h2 className="text-white text-2xl font-bold mb-2">
              Chăm sóc thú cưng dễ dàng 🐾
            </h2>
            <p className="text-white/80 text-sm">
              Đặt lịch nhanh chóng chỉ trong vài bước
            </p>
          </div>

          <Link
            to={'/dat-lich'}
            className="mt-4 bg-white text-primary py-3 px-6 rounded-full font-semibold hover:scale-105 transition"
          >
            Đặt lịch ngay
          </Link>

          <img src="cool-dog.png" alt="dog" className="mt-4 w-full" />
        </div>
      </section>

      {/* CATEGORY */}
      <section className="bg-white rounded-2xl p-6 shadow-sm">
        <CategoryList />
      </section>

      {/* MAIN CONTENT */}
      <div className="grid lg:grid-cols-4 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-3 space-y-12">

          {/* BANNER GRID */}
          <section className="grid md:grid-cols-2 gap-4">
            <Link className="group overflow-hidden rounded-2xl">
              <img
                src="./spa-banner.webp"
                alt="Pet Hotel"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </Link>

            <Link className="group overflow-hidden rounded-2xl">
              <img
                src="./hotel-banner.webp"
                alt="Pet Hotel"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </Link>
          </section>

          {/* FEATURED */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-primary">
                Dịch vụ nổi bật
              </h1>
              <span className="text-sm text-gray-400">
                Khám phá ngay →
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center w-full">
                <img
                  src="./loading-cat.gif"
                  alt="loading..."
                  className="w-1/4"
                />
              </div>
            ) : (
              <ServiceCardList serviceList={services} />
            )}
          </section>

          {/* BIG BANNER */}
          <section className="rounded-2xl overflow-hidden shadow-md">
            <LazyLoadImage
              src="./grooming-banner.webp"
              alt="grooming banner"
              className="w-full object-cover hover:scale-105 transition duration-300"
            />
          </section>

          {/* SUGGESTED */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-primary">
                Gợi ý cho bạn
              </h1>
              <span className="text-sm text-gray-400">
                Cá nhân hóa ✨
              </span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center w-full">
                <img
                  src="./loading-cat.gif"
                  alt="loading..."
                  className="w-1/4"
                />
              </div>
            ) : (
              <ServiceCardList serviceList={services} />
            )}
          </section>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          <div className="sticky top-6 space-y-6">

            {/* MINI CTA */}
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <h3 className="text-lg font-semibold mb-3">
                Đặt lịch nhanh 🚀
              </h3>

              <Link
                to={'/dat-lich'}
                className="bg-primary text-white px-5 py-2 rounded-full hover:bg-primary-dark transition"
              >
                Đặt ngay
              </Link>
            </div>

            {/* DECOR CARD */}
            <div className="bg-tertiary-light rounded-2xl p-4 relative h-40 overflow-hidden">
              <img
                src="./a-half-of-cat-head.png"
                className="absolute left-0 bottom-0 w-24"
              />
              <img
                src="./cute-dog-in-right.png"
                className="absolute right-0 bottom-0 w-20"
              />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;