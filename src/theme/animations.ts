import { keyframes } from '@mui/material/styles';

// Fade animations
export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// Slide animations
export const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const slideInFromTop = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const slideInFromBottom = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

// Scale animations
export const scaleIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`;

export const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

// Common animation durations and easings
export const durations = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195,
} as const;

export const easings = {
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

// Helper function to create transition strings
export const createTransition = (
  properties: string | string[],
  options?: {
    duration?: number;
    easing?: string;
    delay?: number;
  },
) => {
  const {
    duration = durations.standard,
    easing = easings.easeInOut,
    delay = 0,
  } = options ?? {};

  const formattedProperties = Array.isArray(properties)
    ? properties.join(', ')
    : properties;

  const delayString = delay ? ` ${delay}ms` : '';
  return `${formattedProperties} ${duration}ms ${easing}${delayString}`;
};

// Presets for common transitions
export const transitions = {
  fade: {
    enter: {
      animation: `${fadeIn} ${durations.shorter}ms ${easings.easeOut}`,
    },
    exit: {
      animation: `${fadeOut} ${durations.shorter}ms ${easings.easeIn}`,
    },
  },
  slide: {
    right: {
      enter: {
        animation: `${slideInFromRight} ${durations.standard}ms ${easings.easeOut}`,
      },
      exit: {
        animation: `${slideInFromRight} ${durations.standard}ms ${easings.easeIn} reverse`,
      },
    },
    left: {
      enter: {
        animation: `${slideInFromLeft} ${durations.standard}ms ${easings.easeOut}`,
      },
      exit: {
        animation: `${slideInFromLeft} ${durations.standard}ms ${easings.easeIn} reverse`,
      },
    },
    top: {
      enter: {
        animation: `${slideInFromTop} ${durations.standard}ms ${easings.easeOut}`,
      },
      exit: {
        animation: `${slideInFromTop} ${durations.standard}ms ${easings.easeIn} reverse`,
      },
    },
    bottom: {
      enter: {
        animation: `${slideInFromBottom} ${durations.standard}ms ${easings.easeOut}`,
      },
      exit: {
        animation: `${slideInFromBottom} ${durations.standard}ms ${easings.easeIn} reverse`,
      },
    },
  },
  scale: {
    enter: {
      animation: `${scaleIn} ${durations.shorter}ms ${easings.easeOut}`,
    },
    exit: {
      animation: `${scaleIn} ${durations.shorter}ms ${easings.easeIn} reverse`,
    },
  },
  pulse: {
    animation: `${pulseAnimation} ${durations.complex}ms ${easings.easeInOut} infinite`,
  },
} as const;
