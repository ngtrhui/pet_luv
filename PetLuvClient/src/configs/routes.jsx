import { v4 as uuidv4 } from 'uuid';
import {
  BookingPage,
  DogWalkingServicePage,
  HomePage,
  LoginPage,
  RegisterPage,
  ServiceComboDetailPage,
  ServicePage,
  SpaServicePage,
} from '../pages';
import HotelServicePage from '../pages/HotelServicePage';
import ServiceDetailPage from '../pages/ServiceDetailPage';
import RoomDetailPage from '../pages/RoomDetailPage';
import PetInfoPage from '../pages/PetInfoPage';
import BookingSuccessPage from '../pages/BookingSuccessPage';

export default [
  {
    id: `client-route-${uuidv4()}`,
    path: '/',
    element: <HomePage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dang-nhap',
    element: <LoginPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dang-ky',
    element: <RegisterPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dich-vu',
    element: <ServicePage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dich-vu-spa',
    element: <SpaServicePage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dat-cho-di-dao',
    element: <DogWalkingServicePage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dat-cho-di-dao/:serviceId',
    element: <ServiceDetailPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dich-vu-spa/:serviceId',
    element: <ServiceDetailPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dich-vu-spa/combo/:serviceComboId',
    element: <ServiceComboDetailPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/khach-san-thu-cung',
    element: <HotelServicePage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/khach-san-thu-cung/:roomId',
    element: <RoomDetailPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/trang-ca-nhan/bst-thu-cung/thu-cung/:petId',
    element: <PetInfoPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dat-lich',
    element: <BookingPage />,
  },
  {
    id: `client-route-${uuidv4()}`,
    path: '/dat-lich/ket-qua',
    element: <BookingSuccessPage />,
  },
];
