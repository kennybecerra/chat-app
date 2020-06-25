import React from 'react';
import styles from './Message.module.scss';

const Message = (props) => {
  return (
    <div className={styles.messageRight}>
      <div className={styles.inner}>
        <div className={styles.imgContainer}>
          <div className={styles.img}></div>
        </div>
        <div className={styles.name}>Name hello there </div>
      </div>
      {/* <div className={styles.time}>5 minutes ago</div> */}
      <div className={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum,
        voluptatem? Nihil placeat quae, vel vitae aperiam, deleniti voluptates
        culpa eum commodi excepturi quis. Rem animi dolorem et praesentium
        pariatur minus?
        <div className={styles.timeStamp}>7 minutes</div>
      </div>
    </div>
  );
};

const MemoizedMessage = React.memo(Message);

export default MemoizedMessage;
