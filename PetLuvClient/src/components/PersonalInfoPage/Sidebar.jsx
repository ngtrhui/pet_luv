import PropTypes from 'prop-types';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Typography } from '@mui/material';
import SidebarItems from '../../configs/SidebarItems';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const Sidebar = ({ user, sidebarItems = SidebarItems }) => {
  const currentRoute = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routeString = useMemo(
    () => currentRoute.pathname.split('/'),
    [currentRoute]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/dang-nhap');
    dispatch(logout());
  }, [dispatch, navigate]);

  return (
    <aside className='w-72 h-full p-4'>
      <div className='h-full flex flex-col bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200'>

        {/* HEADER / PROFILE */}
        <div className='flex flex-col items-center py-6 border-b'>
          <div className='relative'>
            <Avatar
              alt={user?.fullName || 'User'}
              src={user?.avatar ? `${user?.avatar}` : '/logo.png'}
              sx={{ width: 72, height: 72 }}
            />
            <div className='absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full' />
          </div>

          <Typography
            variant='subtitle1'
            sx={{
              mt: 2,
              maxWidth: '90%',
              fontSize: '0.9rem',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {user?.fullName || 'Người dùng'}
          </Typography>

          <p className='text-xs text-gray-500 mt-1'>Online</p>
        </div>

        {/* NAVIGATION */}
        <nav className='flex-1 px-2 py-4 space-y-1 overflow-y-auto'>
          {sidebarItems.map((item, index) => {
            if (item.path === 'logout') {
              return (
                <button
                  type='button'
                  key={`sidebar-item-${index}`}
                  onClick={handleLogout}
                  className='group flex items-center w-full px-3 py-2 rounded-xl text-gray-600 hover:bg-red-500 hover:text-white transition-all duration-200'
                >
                  <span className='mr-3 transition-transform group-hover:scale-110'>
                    {item.icon}
                  </span>
                  <span className='text-sm font-medium'>{item.label}</span>
                </button>
              );
            }

            const isActive =
              routeString.length < 3 && item.path === ''
                ? true
                : item.path === routeString[routeString.length - 1];

            return (
              <NavLink
                key={`sidebar-item-${index}`}
                to={item.path}
                className={`relative flex items-center px-3 py-2 rounded-xl transition-all duration-200 group
              ${isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-700 hover:bg-primary hover:text-white'
                  }
            `}
              >
                {/* ACTIVE INDICATOR */}
                {isActive && (
                  <span className='absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full' />
                )}

                <span className='mr-3 transition-transform group-hover:scale-110'>
                  {item.icon}
                </span>

                <span className='text-sm font-medium'>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* FOOTER */}
        <div className='p-4 border-t text-xs text-gray-400 text-center'>
          Pet App Dashboard
        </div>
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  user: PropTypes.shape({
    fullName: PropTypes.string,
    avatar: PropTypes.string,
  }),
  sidebarItems: PropTypes.array,
};

export default Sidebar;
