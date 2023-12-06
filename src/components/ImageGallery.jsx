import React, { useState } from 'react';
import styles from './styles.module.css';
import Modal from './Modal';
import Button from './Button';

const ImageGallery = ({ articles, visibleImages, loadMore }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = imageUrl => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <div className={styles.ImageGallery}>
      {articles
        .slice(0, visibleImages)
        .map(({ id, webformatURL, largeImageURL }, index) => {
          const uniqueKey = `${id}_${index}`;
          return (
            <div
              key={uniqueKey}
              onClick={() => openModal(largeImageURL)}
              className={styles.ImageGalleryItem}
            >
              <img
                className={styles.ImageGalleryItemImg}
                src={webformatURL}
                alt={`${id}`}
              />
            </div>
          );
        })}
      <Modal
        isOpen={modalOpen}
        handleClose={closeModal}
        selectedImage={selectedImage}
      >
        {selectedImage && <img src={selectedImage} alt="Large version" />}
      </Modal>
      {articles.length > visibleImages && (
        <Button onClick={handleLoadMore} label="Load More" isHidden={false} />
      )}
    </div>
  );
};

export default ImageGallery;
