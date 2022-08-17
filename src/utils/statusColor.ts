const statusColor = (stat: string): string => {
  switch (stat) {
    case 'Blocked':
      return 'orange';
    case 'Pending':
      return 'grey';
    case 'Done':
      return 'green';
    case 'In progress':
      return '#3d4db7';
    default:
      return 'grey';
  }
};

export default statusColor;