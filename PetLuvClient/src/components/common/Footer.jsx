import { Box, Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { IoMdMail } from 'react-icons/io';
import { FaPhone } from 'react-icons/fa6';
import { GiPositionMarker } from 'react-icons/gi';

const Footer = () => {
  return (
  <div className="bg-background border-t border-primary-light/30 pt-10 pb-6 px-6">
    <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">
      
      {/* Logo + Intro */}
      <Box className="flex flex-col items-center md:items-start gap-4">
        <div className="bg-white shadow-sm rounded-full p-3">
          <img src="/logo.png" alt="logo" className="w-24 h-24 object-contain" />
        </div>

        <Box className="text-center md:text-left max-w-sm">
          <h1 className="text-primary font-cute text-3xl mb-2">PetLuv</h1>
          <p className="text-gray-600 italic leading-relaxed text-sm">
            {`PetLuv ra đời với mong muốn mang lại cho các "boss" những dịch vụ tốt nhất.
            Với nhiều năm kinh nghiệm trong ngành dịch vụ thú cưng bao gồm: Spa thú cưng, Khách sạn
            thú cưng, Dịch vụ thú cưng tại nhà,… PetLuv hứa hẹn sẽ là nơi mang lại 
            trải nghiệm tuyệt vời cho thú cưng của bạn.`}
          </p>
        </Box>
      </Box>

      {/* Services */}
      <Box className="text-center md:text-left">
        <h1 className="text-primary font-semibold text-xl mb-4">
          Dịch vụ
        </h1>
        <div className="flex flex-col gap-2 text-gray-700">
          <Link to="/dich-vu-spa" className="hover:text-primary transition">
            Spa thú cưng
          </Link>
          <Link to="/khach-san-thu-cung" className="hover:text-primary transition">
            Khách sạn thú cưng
          </Link>
          <Link to="/thuc-an-cho-meo" className="hover:text-primary transition">
            Thức ăn thú cưng
          </Link>
          <Link to="/san-pham-cho-meo" className="hover:text-primary transition">
            Bán chó, mèo
          </Link>
        </div>
      </Box>

      {/* Contact */}
      <Box className="text-center md:text-left">
        <h1 className="text-primary font-semibold text-xl mb-4">
          Liên hệ
        </h1>
        <Stack spacing={2} className="text-gray-700 text-sm">
          <div className="flex items-center gap-2 hover:text-primary transition">
            <IoMdMail /> huyb2205940@student.ctu.edu.vn
          </div>
          <div className="flex items-center gap-2 hover:text-primary transition">
            <FaPhone /> 0378773518
          </div>
          <div className="flex items-center gap-2 hover:text-primary transition">
            <GiPositionMarker /> đường 3/2, phường Xuân Khánh, quận Ninh Kiều TPCT
          </div>
        </Stack>
      </Box>
    </div>

    {/* Bottom */}
    <hr className="border-primary-light/30 mb-4" />
    <Typography
      variant="body2"
      className="text-center text-gray-500 hover:text-primary transition"
    >
      © 2025 PetLuv. All rights reserved.
    </Typography>
  </div>
);
};

export default Footer;
