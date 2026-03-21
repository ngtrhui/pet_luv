import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const Category = ({
  categoryName,
  categoryDesc,
  categoryIcon,
  categoryPath,
  ...props
}) => {
  return (
    <Paper elevation={4} className='md:w-1/3 sm:w-1/4 p-6 pb-8 z-50' {...props}>
      {categoryIcon}
      <h1 className='uppercase text-secondary text-xl font-semibold mb-2'>
        {categoryName}
      </h1>
      <p className='mb-8 lg:line-clamp-4 md:line-clamp-3'>{categoryDesc}</p>
      <Link
        to={`/${categoryPath}`}
        className='text-white bg-secondary p-4 px-8 rounded-s-full rounded-e-full hover:opacity-95'
      >
        Xem thêm
      </Link>
    </Paper>
  );
};

Category.propTypes = {
  categoryName: PropTypes.string.isRequired,
  categoryDesc: PropTypes.string.isRequired,
  categoryIcon: PropTypes.node.isRequired,
  categoryPath: PropTypes.string,
};

export default Category;
