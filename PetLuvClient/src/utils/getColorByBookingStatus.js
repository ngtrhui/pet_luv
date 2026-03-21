export default function getStatusColor(statusName) {
  if (!statusName) return '#e0e0e0';

  const status = statusName?.toLowerCase();

  if (status?.includes('hủy') || status?.includes('huy')) {
    return '#ffb3ba';
  } else if (status?.includes('xác nhận') || status?.includes('xac nhan')) {
    return '#b3ffb3';
  } else if (status?.includes('hoàn thành') || status?.includes('hoan thanh')) {
    return '#b3c6ff';
  } else if (status?.includes('xử lý') || status?.includes('xu ly')) {
    return '#fff7b3';
  } else if (status?.includes('cọc') || status?.includes('coc')) {
    return '#3b82f6';
  } else {
    return '#e0e0e0';
  }
}
