import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
import { ImageData } from '../../types';
interface ImageGalleryProps {
  items: ImageData[];
  onImageClick: (image: ImageData) => void;
}
export default function ImageGallery({
  items,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={css.list}>
      {items.map(item => (
        <li className={css.li} key={item.id}>
          <ImageCard data={item} onImageClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}
