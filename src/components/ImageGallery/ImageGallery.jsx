import css from './ImageGallery.module.css';
import ImageCard from '../ImageCard/ImageCard';
export default function ImageGallery({ items, onImageClick }) {
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
