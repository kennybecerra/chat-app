import React from 'react';

const Icon = ({ name = '', className = '', ...props }) => (
  <svg
    {...props}
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    viewBox={getViewBox(name)}
    xmlnsXlink='http://www.w3.org/1999/xlink'>
    {getPath(name)}
  </svg>
);

export default Icon;

const getViewBox = (name) => {
  switch (name) {
    case 'heart-outline':
      return '0 0 28 28';
    case 'heart-solid':
      return '0 0 28 28';
    case 'add-outline':
      return '0 0 20 20';
    case 'add-solid':
      return '0 0 20 20';
    case 'close-outline':
      return '0 0 20 20';
    case 'minus-outline':
      return '0 0 20 20';
    case 'minus-solid':
      return '0 0 20 20';
    case 'checkmark-outline':
      return '0 0 20 20';
    case 'file-text':
      return '0 0 32 32';
    case 'cart':
      return '0 0 32 32';
    case 'stopwatch':
      return '0 0 32 33';
    case 'user':
      return '0 0 32 32';
    case 'search':
      return '0 0 32 32';
    case 'spoon-knife':
      return '0 0 32 32';
    case 'chevron-down':
      return '0 0 8 8';
    case 'chevron-up':
      return '0 0 8 8';
    case 'chevron-left':
      return '0 0 21 28';
    case 'chevron-right':
      return '0 0 19 28';
    case 'message':
      return '0 0 20 20';
    case 'drawer':
      return '0 0 32 32';
    case 'gamepad':
      return '0 0 30 28';
    case 'play-circle':
      return '0 0 24 28';
    default:
      return '0 0 32 32';
  }
};

const getPath = (name) => {
  switch (name) {
    case 'heart-outline':
      return (
        <path d='M26 9.312c0-4.391-2.969-5.313-5.469-5.313-2.328 0-4.953 2.516-5.766 3.484-0.375 0.453-1.156 0.453-1.531 0-0.812-0.969-3.437-3.484-5.766-3.484-2.5 0-5.469 0.922-5.469 5.313 0 2.859 2.891 5.516 2.922 5.547l9.078 8.75 9.063-8.734c0.047-0.047 2.938-2.703 2.938-5.563zM28 9.312c0 3.75-3.437 6.891-3.578 7.031l-9.734 9.375c-0.187 0.187-0.438 0.281-0.688 0.281s-0.5-0.094-0.688-0.281l-9.75-9.406c-0.125-0.109-3.563-3.25-3.563-7 0-4.578 2.797-7.313 7.469-7.313 2.734 0 5.297 2.156 6.531 3.375 1.234-1.219 3.797-3.375 6.531-3.375 4.672 0 7.469 2.734 7.469 7.313z' />
      );
    case 'heart-solid':
      return (
        <path d='M14 26c-0.25 0-0.5-0.094-0.688-0.281l-9.75-9.406c-0.125-0.109-3.563-3.25-3.563-7 0-4.578 2.797-7.313 7.469-7.313 2.734 0 5.297 2.156 6.531 3.375 1.234-1.219 3.797-3.375 6.531-3.375 4.672 0 7.469 2.734 7.469 7.313 0 3.75-3.437 6.891-3.578 7.031l-9.734 9.375c-0.187 0.187-0.438 0.281-0.688 0.281z' />
      );
    case 'add-outline':
      return (
        <path d='M11 9h4v2h-4v4h-2v-4h-4v-2h4v-4h2v4zM10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0zM10 18c4.418 0 8-3.582 8-8s-3.582-8-8-8v0c-4.418 0-8 3.582-8 8s3.582 8 8 8v0z' />
      );
    case 'add-solid':
      return (
        <path d='M11 9v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0z' />
      );
    case 'close-outline':
      return (
        <path d='M2.93 17.070c-1.884-1.821-3.053-4.37-3.053-7.193 0-5.523 4.477-10 10-10 2.823 0 5.372 1.169 7.19 3.050l0.003 0.003c1.737 1.796 2.807 4.247 2.807 6.947 0 5.523-4.477 10-10 10-2.7 0-5.151-1.070-6.95-2.81l0.003 0.003zM4.34 15.66c1.449 1.449 3.45 2.344 5.66 2.344 4.421 0 8.004-3.584 8.004-8.004 0-2.21-0.896-4.211-2.344-5.66v0c-1.449-1.449-3.45-2.344-5.66-2.344-4.421 0-8.004 3.584-8.004 8.004 0 2.21 0.896 4.211 2.344 5.66v0zM14.24 7.17l-2.83 2.83 2.83 2.83-1.41 1.41-2.83-2.83-2.83 2.83-1.41-1.41 2.83-2.83-2.83-2.83 1.41-1.41 2.83 2.83 2.83-2.83 1.41 1.41z' />
      );
    case 'minus-outline':
      return (
        <path d='M10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0zM10 18c4.418 0 8-3.582 8-8s-3.582-8-8-8v0c-4.418 0-8 3.582-8 8s3.582 8 8 8v0zM15 9v2h-10v-2h10z' />
      );
    case 'minus-solid':
      return (
        <path d='M10 20c-5.523 0-10-4.477-10-10s4.477-10 10-10v0c5.523 0 10 4.477 10 10s-4.477 10-10 10v0zM15 9h-10v2h10v-2z' />
      );
    case 'checkmark-outline':
      return (
        <path d='M2.93 17.070c-1.884-1.821-3.053-4.37-3.053-7.193 0-5.523 4.477-10 10-10 2.823 0 5.372 1.169 7.19 3.050l0.003 0.003c1.737 1.796 2.807 4.247 2.807 6.947 0 5.523-4.477 10-10 10-2.7 0-5.151-1.070-6.95-2.81l0.003 0.003zM15.66 15.66c1.449-1.449 2.344-3.45 2.344-5.66 0-4.421-3.584-8.004-8.004-8.004-2.21 0-4.211 0.896-5.66 2.344v0c-1.449 1.449-2.344 3.45-2.344 5.66 0 4.421 3.584 8.004 8.004 8.004 2.21 0 4.211-0.896 5.66-2.344v0zM6.7 9.29l2.3 2.31 4.3-4.3 1.4 1.42-5.7 5.68-3.7-3.7 1.4-1.42z' />
      );
    case 'file-text':
      return (
        <path d='M27 0h-24c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h24c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM26 28h-22v-24h22v24zM8 14h14v2h-14zM8 18h14v2h-14zM8 22h14v2h-14zM8 10h14v2h-14z' />
      );
    case 'cart':
      return (
        <>
          <path d='M12 29c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z' />
          <path d='M32 29c0 1.657-1.343 3-3 3s-3-1.343-3-3c0-1.657 1.343-3 3-3s3 1.343 3 3z' />
          <path d='M32 16v-12h-24c0-1.105-0.895-2-2-2h-6v2h4l1.502 12.877c-0.915 0.733-1.502 1.859-1.502 3.123 0 2.209 1.791 4 4 4h24v-2h-24c-1.105 0-2-0.895-2-2 0-0.007 0-0.014 0-0.020l26-3.98z' />
        </>
      );
    case 'stopwatch':
      return (
        <path d='M16 6.038v-2.038h4v-2c0-1.105-0.895-2-2-2h-6c-1.105 0-2 0.895-2 2v2h4v2.038c-6.712 0.511-12 6.119-12 12.962 0 7.18 5.82 13 13 13s13-5.82 13-13c0-6.843-5.288-12.451-12-12.962zM22.071 26.071c-1.889 1.889-4.4 2.929-7.071 2.929s-5.182-1.040-7.071-2.929c-1.889-1.889-2.929-4.4-2.929-7.071s1.040-5.182 2.929-7.071c1.814-1.814 4.201-2.844 6.754-2.923l-0.677 9.813c-0.058 0.822 0.389 1.181 0.995 1.181s1.053-0.36 0.995-1.181l-0.677-9.813c2.552 0.079 4.94 1.11 6.754 2.923 1.889 1.889 2.929 4.4 2.929 7.071s-1.040 5.182-2.929 7.071z' />
      );
    case 'user':
      return (
        <path d='M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z' />
      );
    case 'search':
      return (
        <path d='M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z' />
      );
    case 'spoon-knife':
      return (
        <path d='M7 0c-3.314 0-6 3.134-6 7 0 3.31 1.969 6.083 4.616 6.812l-0.993 16.191c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.993-16.191c2.646-0.729 4.616-3.502 4.616-6.812 0-3.866-2.686-7-6-7zM27.167 0l-1.667 10h-1.25l-0.833-10h-0.833l-0.833 10h-1.25l-1.667-10h-0.833v13c0 0.552 0.448 1 1 1h2.604l-0.982 16.004c-0.067 1.098 0.778 1.996 1.878 1.996h1c1.1 0 1.945-0.898 1.878-1.996l-0.982-16.004h2.604c0.552 0 1-0.448 1-1v-13h-0.833z' />
      );
    case 'chevron-down':
      return (
        <path d='M1.806 3.019c0.174-0.178 0.417-0.192 0.63 0l1.563 1.499 1.563-1.499c0.213-0.192 0.456-0.178 0.63 0 0.174 0.178 0.163 0.479 0 0.646s-1.878 1.801-1.878 1.801c-0.087 0.089-0.201 0.134-0.315 0.134s-0.228-0.045-0.316-0.134c0 0-1.715-1.634-1.878-1.801s-0.174-0.468 0-0.646z' />
      );
    case 'chevron-up':
      return (
        <path d='M6.194 4.981c-0.174 0.178-0.417 0.192-0.63 0l-1.563-1.499-1.563 1.499c-0.213 0.192-0.456 0.178-0.63 0-0.174-0.178-0.163-0.479 0-0.646s1.878-1.801 1.878-1.801c0.087-0.089 0.201-0.134 0.315-0.134s0.228 0.045 0.316 0.134c0 0 1.715 1.634 1.878 1.801s0.174 0.468 0 0.646z' />
      );
    case 'chevron-left':
      return (
        <path d='M18.297 4.703l-8.297 8.297 8.297 8.297c0.391 0.391 0.391 1.016 0 1.406l-2.594 2.594c-0.391 0.391-1.016 0.391-1.406 0l-11.594-11.594c-0.391-0.391-0.391-1.016 0-1.406l11.594-11.594c0.391-0.391 1.016-0.391 1.406 0l2.594 2.594c0.391 0.391 0.391 1.016 0 1.406z' />
      );
    case 'chevron-right':
      return (
        <path d='M17.297 13.703l-11.594 11.594c-0.391 0.391-1.016 0.391-1.406 0l-2.594-2.594c-0.391-0.391-0.391-1.016 0-1.406l8.297-8.297-8.297-8.297c-0.391-0.391-0.391-1.016 0-1.406l2.594-2.594c0.391-0.391 1.016-0.391 1.406 0l11.594 11.594c0.391 0.391 0.391 1.016 0 1.406z' />
      );
    case 'message':
      return (
        <path d='M18 6v7c0 1.1-0.9 2-2 2h-4v3l-4-3h-4c-1.101 0-2-0.9-2-2v-7c0-1.1 0.899-2 2-2h12c1.1 0 2 0.9 2 2z' />
      );
    case 'drawer':
      return (
        <>
          <path d='M31.781 20.375l-8-10c-0.19-0.237-0.477-0.375-0.781-0.375h-14c-0.304 0-0.591 0.138-0.781 0.375l-8 10c-0.142 0.177-0.219 0.398-0.219 0.625v9c0 1.105 0.895 2 2 2h28c1.105 0 2-0.895 2-2v-9c0-0.227-0.077-0.447-0.219-0.625zM30 22h-7l-4 4h-6l-4-4h-7v-0.649l7.481-9.351h13.039l7.481 9.351v0.649z'></path>
          <path d='M23 16h-14c-0.552 0-1-0.448-1-1s0.448-1 1-1h14c0.552 0 1 0.448 1 1s-0.448 1-1 1z'></path>
          <path d='M25 20h-18c-0.552 0-1-0.448-1-1s0.448-1 1-1h18c0.552 0 1 0.448 1 1s-0.448 1-1 1z'></path>
        </>
      );
    case 'gamepad':
      return (
        <path d='M13 17v-2c0-0.281-0.219-0.5-0.5-0.5h-3v-3c0-0.281-0.219-0.5-0.5-0.5h-2c-0.281 0-0.5 0.219-0.5 0.5v3h-3c-0.281 0-0.5 0.219-0.5 0.5v2c0 0.281 0.219 0.5 0.5 0.5h3v3c0 0.281 0.219 0.5 0.5 0.5h2c0.281 0 0.5-0.219 0.5-0.5v-3h3c0.281 0 0.5-0.219 0.5-0.5zM22 18c0-1.109-0.891-2-2-2s-2 0.891-2 2 0.891 2 2 2 2-0.891 2-2zM26 14c0-1.109-0.891-2-2-2s-2 0.891-2 2 0.891 2 2 2 2-0.891 2-2zM30 16c0 4.422-3.578 8-8 8-2.031 0-3.875-0.766-5.281-2h-3.437c-1.406 1.234-3.25 2-5.281 2-4.422 0-8-3.578-8-8s3.578-8 8-8h14c4.422 0 8 3.578 8 8z'></path>
      );
    case 'play-circle':
      return (
        <path d='M12 2c6.625 0 12 5.375 12 12s-5.375 12-12 12-12-5.375-12-12 5.375-12 12-12zM18 14.859c0.313-0.172 0.5-0.5 0.5-0.859s-0.187-0.688-0.5-0.859l-8.5-5c-0.297-0.187-0.688-0.187-1-0.016-0.313 0.187-0.5 0.516-0.5 0.875v10c0 0.359 0.187 0.688 0.5 0.875 0.156 0.078 0.328 0.125 0.5 0.125s0.344-0.047 0.5-0.141z'></path>
      );
    default:
      return <path />;
  }
};