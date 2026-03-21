import {
  FaCircleUser,
  FaLocationDot,
  FaLock,
  FaCalendar,
} from 'react-icons/fa6';
import { MdOutlinePets, MdPayments } from 'react-icons/md';
import { IoBag, IoLogOutOutline } from 'react-icons/io5';

export default [
  {
    label: 'Hồ sơ',
    icon: <FaCircleUser />,
    path: '',
  },
  // {
  //   label: 'Sổ địa chỉ',
  //   icon: <FaLocationDot />,
  //   path: 'dia-chi',
  // },
  {
    label: 'BST Thú cưng',
    icon: <MdOutlinePets />,
    path: 'bst-thu-cung',
  },
  // {
  //   label: 'Đơn mua',
  //   icon: <IoBag />,
  //   path: 'don-mua',
  // },
  {
    label: 'Lịch hẹn',
    icon: <FaCalendar />,
    path: 'lich-hen',
  },
  {
    label: 'Lịch sử thanh toán',
    icon: <MdPayments />,
    path: 'lich-su-thanh-toan',
  },
  {
    label: 'Riêng tư',
    icon: <FaLock />,
    path: 'bao-mat',
  },
  {
    label: 'Đăng xuất',
    icon: <IoLogOutOutline />,
    path: 'logout',
  },
];
