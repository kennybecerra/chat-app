import React, { useMemo } from 'react';
import { useSpring, animated, interpolate, useTransition } from 'react-spring';
import styles from './FormControls.module.scss';

// Private variables for Developer to configure color Schemes

const config = {
  color: [
    {
      disable: {
        start: 'rgb(255, 0, 0)',
        end: 'rgb(255, 165, 0)',
      },
      enable: {
        start: 'rgb(0,255,0)',
        end: 'rgb(255,255,0)',
      },
    },
    {
      disable: {
        start: 'rgb(183, 48, 124)',
        end: 'rgb(255, 202, 241)',
      },
      enable: {
        start: 'rgb(47, 73, 255)',
        end: 'rgb(215, 244, 255)',
      },
    },
  ],
};

const Form = React.memo((props) => {
  const { children, ...rest } = props;
  return (
    <form
      {...rest}
      onSubmit={(e) => {
        e.preventDefault();
      }}>
      {children}
    </form>
  );
});

const ButtonGroup = React.memo(({ children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={
        className
          ? `${className} ${styles.buttonGroup}`
          : `${styles.buttonGroup}`
      }>
      {children}
    </div>
  );
});

const Button = ({ children, disable, loading, onClick, ...rest }) => {
  // const springStyles = useSpring({
  //   from: {
  //     stopColor1: config.color[0].disable.start,
  //     stopColor2: config.color[0].disable.end,
  //     deg: 0,
  //   },
  //   to: {
  //     stopColor1: disable
  //       ? config.color[0].disable.start
  //       : config.color[0].enable.start,
  //     stopColor2: disable
  //       ? config.color[0].disable.end
  //       : config.color[0].enable.end,
  //     deg: 0,
  //   },
  // });

  const [springStyles, set, stop] = useSpring(() => ({
    stopColor1: config.color[0].disable.start,
    stopColor2: config.color[0].disable.end,
    deg: 90,
  }));

  set({
    stopColor1: disable
      ? config.color[0].disable.start
      : config.color[0].enable.start,
    stopColor2: disable
      ? config.color[0].disable.end
      : config.color[0].enable.end,
  });

  const loadingTransition = useTransition(loading, (loading) => loading, {
    from: {
      opacity: 0,
      backgroundColor: 'rgba(0,0,0,0)',
    },
    enter: (loading) => {
      return {
        opacity: loading ? 1 : 0,
        backgroundColor: 'rgba(0,0,0,1)',
      };
    },
    leave: (loading) => {
      return { opacity: 0 };
    },
  });

  const handleFocus = () => {
    set({
      deg: 450,
    });
  };
  const handleBlur = () => {
    set({
      deg: 90,
    });
  };

  return (
    <div className={styles.buttonContainer}>
      <animated.svg
        width='100%'
        height='100%'
        style={{
          background: interpolate(
            [
              springStyles.deg,
              springStyles.stopColor1,
              springStyles.stopColor2,
            ],
            (deg, a, b) => {
              return `linear-gradient(${deg}deg, ${a}, ${b})`;
            }
          ),
        }}></animated.svg>
      <button
        {...rest}
        type='button'
        className={styles.button}
        onClick={() => !disable && onClick()}
        onFocus={handleFocus}
        onBlur={handleBlur}>
        {children}
        {loadingTransition.map(({ item: loading, key, props: styles }) => {
          return (
            <animated.span key={key} style={styles}>
              {loading && 'loading...'}
            </animated.span>
          );
        })}
      </button>
    </div>
  );
};

const InputGroup = React.memo(({ children, className, ...rest }) => {
  return (
    <div
      {...rest}
      className={
        className ? `${className} ${styles.inputGroup}` : `${styles.inputGroup}`
      }>
      {children}
    </div>
  );
});

const Input = (props) => {
  //set props
  const { className, label, onVerify, onType, ...rest } = props;

  // Set unique names
  const crypto = window.crypto || window.msCrypto; // IE 11 compatibility
  let array = new Uint16Array(3);
  const uniqueName = useMemo(() => {
    return crypto.getRandomValues(array).join('');
  }, []);

  // Set react-spring animation for on focus and verfied input
  const [springStyles, set] = useSpring(() => ({
    width: '0%',
    background: `linear-gradient(to right, ${config.color[0].disable.start} 0% , ${config.color[0].disable.end} 100%)`,
  }));

  // Handlers for Input that triggers animations (the animations do not trigger re renders due to react spring!!!)
  const handleInputChange = (e) => {
    const { value, type } = e.target;
    if (onVerify) {
      set({
        background: onVerify(value, type)
          ? `linear-gradient(to right, ${config.color[0].enable.start} 0% , ${config.color[0].enable.end} 100%)`
          : `linear-gradient(to right, ${config.color[0].disable.start} 0% , ${config.color[0].disable.end} 100%)`,
      });

      if (onType) {
        onType(value, type);
      }
    }
  };

  const handleFocus = () => {
    set({ width: '100%' });
  };

  const handleBlur = (e) => {
    const { value, type } = e.target;
    // if input is verified , leave the animated bar shown (should stay green)
    if (onVerify && !onVerify(value, type)) set({ width: '0%' });
  };

  return (
    <div className={styles.inputContainer}>
      <label htmlFor={uniqueName}>{label}</label>
      <input
        name={uniqueName}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleInputChange}
      />

      <animated.span style={springStyles}></animated.span>
    </div>
  );
};

export { Button, ButtonGroup, Input, InputGroup, Form };
