import css from './ImageCard.module.css';
import { ImageData } from '../../types';
interface ImageCardProps {
  data: ImageData;
  onImageClick: (image: ImageData) => void;
}

export default function ImageCard({ data, onImageClick }: ImageCardProps) {
  return (
    <div>
      <img
        className={css.link}
        src={data.imageCardUrl}
        alt={data.description || 'No description available'}
        onClick={() => onImageClick(data)}
      />
      <div className={css.info}>
        <p className={css.item}>
          <b>Likes</b> {data.likes}
        </p>

        <p className={css.item}>
          <b>Author</b>
          {data.author}
        </p>
      </div>
    </div>
  );
}
