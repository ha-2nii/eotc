import React from 'react';

export interface CrossWatermarkProps {
  /**
   * Size presets or custom dimension:
   * 'sm' (180px), 'md' (280px), 'lg' (420px), 'xl' (560px), 'full' (100%)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | number;
  
  /**
   * Opacity percentage (e.g. 5, 10, 15, 25, 40)
   * Default: 10
   */
  opacity?: number;
  
  /**
   * Position placement shorthand:
   * 'center' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
   */
  position?: 'center' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  
  /**
   * Variant of the watermark:
   * 'transparent' (cutout PNG, recommended for dark/light backgrounds)
   * 'parchment' (original with parchment backing)
   */
  variant?: 'transparent' | 'parchment';
  
  /**
   * Additional custom Tailwind classes (e.g. "pointer-events-none -translate-y-1/3")
   */
  className?: string;
  
  /**
   * Optional custom style overrides
   */
  style?: React.CSSProperties;
  
  /**
   * Optional subtle rotation angle (in degrees)
   */
  rotate?: number;
}

export const CrossWatermark: React.FC<CrossWatermarkProps> = ({
  size = 'lg',
  opacity = 10,
  position = 'center',
  variant = 'transparent',
  className = '',
  style = {},
  rotate = 0,
}) => {
  const imageSrc =
    variant === 'transparent'
      ? '/assets/images/eotc_cross_watermark_transparent.png'
      : '/assets/images/eotc_cross_watermark.png';

  // Size mapping
  const getSizeStyles = () => {
    if (typeof size === 'number') {
      return { width: `${size}px`, height: `${size}px` };
    }
    switch (size) {
      case 'sm':
        return { width: '180px', height: '180px' };
      case 'md':
        return { width: '280px', height: '280px' };
      case 'lg':
        return { width: '420px', height: '420px' };
      case 'xl':
        return { width: '560px', height: '560px' };
      case 'full':
        return { width: '100%', height: '100%' };
      default:
        return { width: '420px', height: '420px' };
    }
  };

  // Position class mapping
  const getPositionClasses = () => {
    switch (position) {
      case 'center':
        return 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2';
      case 'left':
        return 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/4';
      case 'right':
        return 'right-0 top-1/2 -translate-y-1/2 translate-x-1/4';
      case 'top-right':
        return 'top-0 right-0 -translate-y-1/4 translate-x-1/4';
      case 'top-left':
        return 'top-0 left-0 -translate-y-1/4 -translate-x-1/4';
      case 'bottom-right':
        return 'bottom-0 right-0 translate-y-1/4 translate-x-1/4';
      case 'bottom-left':
        return 'bottom-0 left-0 translate-y-1/4 -translate-x-1/4';
      default:
        return '';
    }
  };

  const { width, height } = getSizeStyles();

  return (
    <div
      className={`absolute pointer-events-none select-none z-0 ${getPositionClasses()} ${className}`}
      style={{
        width,
        height,
        opacity: opacity / 100,
        transform: rotate ? `${style.transform || ''} rotate(${rotate}deg)` : style.transform,
        ...style,
      }}
      aria-hidden="true"
    >
      <img
        src={imageSrc}
        alt="EOTC Sacred Cross Watermark"
        className="w-full h-full object-contain filter drop-shadow-sm"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
};

export default CrossWatermark;
