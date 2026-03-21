class Enum {
  static gender = {
    true: 'Nam',
    false: 'Nữ',
  };

  static staffType = {
    true: 'Toàn thời gian',
    false: 'Bán thời gian',
  };

  static getGender(value) {
    if (typeof value !== 'boolean') return 'Invalid Value';
    return Enum.gender[value];
  }

  static getStaffType(value) {
    if (typeof value !== 'boolean') return 'Invalid Value';
    return Enum.staffType[value];
  }
}

export default Enum;
