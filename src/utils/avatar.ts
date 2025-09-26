function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function getAvatarProps(
  name: string,
  customStyles: object = {},
  variant: 'circular' | 'rounded' | 'square' = 'circular'
) {
  const nameParts = name.split(' ').filter(Boolean);
  let children = '';
  if (nameParts.length > 1) {
    children = `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
  } else if (nameParts.length === 1) {
    children = `${nameParts[0][0]}`.toUpperCase();
  }

  return {
    sx: {
      bgcolor: stringToColor(name),
      ...customStyles,
    },
    variant,
    children,
  };
}