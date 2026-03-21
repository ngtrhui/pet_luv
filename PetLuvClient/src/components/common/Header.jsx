import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';
import { Avatar, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { hoverDropdownConfig } from '../../configs/animationConfigurations';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate = useNavigate();

  const [searchHovered, setSearchHovered] = useState(false);

  const loggedInUser = useSelector((state) => state.auth.user);

  const searchAnimation = useSpring(hoverDropdownConfig(searchHovered));

  // HANDLER EVENT FUNCTIONS

  const handleSearch = (e) => {
    e.preventDefault();

    alert('ok');
  };

  // SUPPORT FUNCTIONS
  return (
  <header className="bg-background border-b border-primary-light/30 px-8 py-3 flex items-center justify-between sticky top-0 z-50">
    {/* Logo */}
    <Link to="/" className="flex items-center gap-2">
      <img
        src="/logo.png"
        alt="logo"
        className="w-[4.5rem] h-[4rem] object-contain"
      />
      <span className="text-primary font-cute text-2xl hidden sm:block">
        PetLuv
      </span>
    </Link>

    {/* Navigation */}
    <nav className="hidden md:flex items-center gap-8">
      {[
        { name: 'Trang chủ', path: '/' },
        { name: 'Giới thiệu', path: '/gioi-thieu' },
        { name: 'Dịch vụ', path: '/dich-vu' },
        { name: 'Đặt lịch', path: '/dat-lich' },
        { name: 'Liên hệ', path: '/lien-he' },
      ].map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="text-gray-700 font-medium text-lg relative group"
        >
          {item.name}
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </nav>

    {/* Right Section */}
    <div className="flex items-center gap-4">
      {/* Search Icon (giữ logic nếu bạn mở lại) */}
      {/* <IconButton
        onMouseEnter={() => setSearchHovered(true)}
        onMouseLeave={() => setSearchHovered(false)}
      >
        <SearchIcon className="text-primary" />
      </IconButton> */}

      {/* Cart */}
      {/* <IconButton onClick={() => navigate('/gio-hang')}>
        <ShoppingCartIcon className="text-primary" />
      </IconButton> */}

      {/* User */}
      {loggedInUser ? (
        <Link to="/trang-ca-nhan">
          <Avatar
            alt={loggedInUser?.fullName || 'Avatar'}
            src={loggedInUser?.avatar}
            className="ring-2 ring-primary hover:scale-105 transition"
          />
        </Link>
      ) : (
        <Link
          to="/dang-nhap"
          className="px-5 py-2 rounded-full bg-primary text-white font-medium shadow-sm hover:bg-primary-light transition-all duration-300"
        >
          Đăng nhập
        </Link>
      )}
    </div>
  </header>
);
};

export default Header;
