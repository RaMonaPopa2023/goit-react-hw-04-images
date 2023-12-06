import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './ErrorAlert.module.css';

const ErrorAlert = ({ errors }) => {
  const [isClosed, setIsClosed] = useState(false);

  if (errors.length === 0 || isClosed) {
    return null;
  }

  return (
    <section className={styles.alert}>
      <div className={styles.content}>
        <p>{errors}</p>
        <span className={styles.close} onClick={() => setIsClosed(true)}></span>
      </div>
    </section>
  );
};

ErrorAlert.propTypes = {
  errors: PropTypes.string.isRequired,
};

export default ErrorAlert;
