import PropTypes from 'prop-types';
import { Breadcrumbs } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const CustomBreadCrumbs = ({ breadCrumbItems, ...props }) => {
  return (
    <div {...props}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />}>
        {breadCrumbItems}
      </Breadcrumbs>
    </div>
  );
};

CustomBreadCrumbs.propTypes = {
  breadCrumbItems: PropTypes.array.isRequired,
  props: PropTypes.any,
};

export default CustomBreadCrumbs;
