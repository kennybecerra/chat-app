import React, { useEffect, useRef } from 'react';
import { debounce } from '../../utility/utility';
import styles from './Scroller.module.scss';

const Scroller = ({ children }) => {
  const ele = useRef(null);

  useEffect(() => {
    console.log('This is the ref');

    ele.current.addEventListener(
      'touchstart',
      debounce(
        (e) => {
          console.log(e.currentTarget);
          ele.current.classList.add(styles.hover);
        },
        500,
        {
          leading: true,
          trailing: false,
        }
      )
    );

    ele.current.addEventListener(
      'touchend',
      debounce(
        () => {
          ele.current.classList.remove(styles.hover);
        },
        2000,
        {
          leading: false,
          trailing: true,
        }
      )
    );

    return () => {};
  }, []);

  // return React.cloneElement(children, {
  //   className: `${children.props.className} ${styles.scroller}`,
  // });

  return (
    <children.type
      {...children.props}
      className={`${children.props.className} ${styles.scroller}`}
      ref={ele}>
      {children.props.children}
    </children.type>
  );
};

export default Scroller;
