import { useState, type ImgHTMLAttributes } from 'react';

export function FoodImage({ alt = '', className = '', onError, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`food-image-fallback ${className}`.trim()} role="img" aria-label={alt}>
        <span>Luca Cafe</span>
        <small>{alt}</small>
      </div>
    );
  }
  return (
    <img
      {...props}
      className={className}
      alt={alt}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
    />
  );
}
