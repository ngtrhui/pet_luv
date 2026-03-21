import { useState } from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';

const PasswordField = ({
  name,
  label,
  value,
  onChange,
  disabled,
  error,
  helperText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <TextField
      fullWidth
      type={showPassword ? 'text' : 'password'}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
      variant='outlined'
      error={error}
      helperText={helperText}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={toggleShowPassword} edge='end'>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default PasswordField;
