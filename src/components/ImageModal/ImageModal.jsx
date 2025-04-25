import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root'); // Додаємо для доступності

export default function ImageModal({ isOpen, closeModal, imageUrl, imageAlt }) {
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
