import axios from 'axios';

export const fetchImages = async (topic, currentPage) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: {
      client_id: 'pPjHulOzdpExiyyjyADdG8UPY1LICv8Br64IozhWM-M',
      query: topic,
      orientation: 'landscape',
      per_page: 12,
      page: currentPage,
    },
  });

  return response.data.results.map(
    ({ id, likes, description, user, urls }) => ({
      id,
      likes,
      description: description || 'No description', // Додаємо перевірку на пустий опис
      author: user.name, // Ім'я автора фото
      imageCardUrl: urls.small, // для галереї картинка
      imageModalUrl: urls.regular, //для модального вікна картинка
    })
  );
};
