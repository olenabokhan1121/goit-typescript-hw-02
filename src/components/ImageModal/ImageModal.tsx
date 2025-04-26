import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root'); // Додаємо для доступності
interface ImageModalProps {
  isOpen: boolean;
  closeModal: () => void;
  imageUrl: string;
  imageAlt: string;
}
export default function ImageModal({
  isOpen,
  closeModal,
  imageUrl,
  imageAlt,
}: ImageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal} // Закриття при ESC або кліку поза зображенням
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <div className={css.content}>
        <img src={imageUrl} alt={imageAlt} />
      </div>
    </Modal>
  );
}
