import axios from 'axios';
import { ImageData } from './types';

export const fetchImages = async (
  topic: string,
  currentPage: number
): Promise<ImageData[]> => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      client_id: 'pPjHulOzdpExiyyjyADdG8UPY1LICv8Br64IozhWM-M',
      query: topic,
      orientation: 'landscape',
      per_page: 12,
      page: currentPage,
    },
  });
  return response.data.results.map((img: any) => ({
    id: img.id,
    likes: img.likes,
    description: img.description || 'No description', // Додаємо перевірку на пустий опис
    author: img.user.name, // Ім'я автора фото
    imageCardUrl: img.urls.small, // для галереї картинка
    imageModalUrl: img.urls.regular, //для модального вікна картинка
  }));
};
