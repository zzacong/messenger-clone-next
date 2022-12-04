import cuid from 'cuid';

export const generateImageUrl = () => {
  return `https://avatars.dicebear.com/api/avataaars/${cuid()}.svg`;
};
