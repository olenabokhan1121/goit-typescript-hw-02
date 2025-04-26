import { useEffect, useState, useRef } from 'react';
import { fetchImages } from '../../api';
import css from './App.module.css';
import ImageGallery from '../ImageGallery/ImageGallery';
import SearchBar from '../SearchBar/SearchBar';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ImageModal from '../ImageModal/ImageModal';
import toast, { Toaster } from 'react-hot-toast';
import ClipLoader from 'react-spinners/ClipLoader';
import { ImageData } from '../../types';
function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<Pick<
    ImageData,
    'description' | 'imageModalUrl'
  > | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null); //  Створюємо реф для галереї

  const handleLoadMoreClick = () => {
    setPage(prevPage => prevPage + 1);
  };
  const openModal = (image: ImageData) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };
  const handleSearch = (topic: string) => {
    if (!topic.trim()) {
      toast.error('Будь ласка, введіть текст для пошуку!');
      return;
    }

    setSearchTerm(`${topic}/${Date.now()}`);
    setPage(1);
    setImages([]);
  };

  useEffect(() => {
    if (!searchTerm) return;
    async function getData() {
      try {
        setError(false);
        setIsLoading(true);

        const data = await fetchImages(searchTerm, page);
        if (data.length === 0) {
          toast.error('Зображення не знайдені. Спробуйте інший запит.');
          return;
        }
        setImages(prevImages => {
          return [...prevImages, ...data];
        });
      } catch (error) {
        setError(true);
        toast.error('Помилка при завантаженні. Будь ласка, спробуйте ще раз.');
        console.error('Помилка завантаження:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [page, searchTerm]);
  //  Виконуємо автоматичний скрол після завантаження нових картинок
  useEffect(() => {
    if (page > 1 && images.length > 0) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          const gallery = galleryRef.current;
          if (gallery) {
            const lastImage = gallery.querySelector('li:last-child'); // Знаходимо останнє зображення
            if (lastImage) {
              lastImage.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
          }
        });
      }, 200); // Чекаємо 200 мс, щоб React встиг оновити DOM
    }
  }, [images, page]); // Залежність від зміни `images` та `page`// Спрацьовує після зміни `images`
  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      <Toaster position="top-center" />
      {error && <b>Сталася помилка. Будь ласка, спробуйте ще раз.</b>}
      <div ref={galleryRef}>
        {images.length > 0 && (
          <ImageGallery items={images} onImageClick={openModal} />
        )}
      </div>

      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMoreClick} />
      )}

      {isLoading && (
        <ClipLoader
          color="#36d7b7"
          loading={isLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          imageUrl={selectedImage.imageModalUrl}
          imageAlt={selectedImage.description}
        />
      )}
    </div>
  );
}

export default App;

/*
// Коли відбувається http запит?
//   1) Зміна терміну пошуку searchTerm (сабміт форми)
//   2) Зміна номеру групи page (Клnuік по load more)

*/
