import { useEffect, useState } from "react";
import type { FC, ReactNode } from "react";
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { transitions } from "./animations";

type AnimationType = "enter" | "exit";
type Direction = "left" | "right" | "top" | "bottom";

interface AnimatedBoxProps extends BoxProps {
  animation?: "fade" | "slide" | "scale" | "pulse";
  animationType?: AnimationType;
  direction?: Direction;
  show?: boolean;
  children: ReactNode;
  onExited?: () => void;
}

const getTransitionStyle = (
  animation?: AnimatedBoxProps["animation"],
  animationType?: AnimationType,
  direction?: Direction
) => {
  if (!animation || !animationType) return "";

  if (animation === "slide" && direction) {
    return transitions.slide[direction][animationType];
  }

  if (animation === "pulse") {
    return transitions.pulse;
  }

  if (animation === "fade") {
    return transitions.fade[animationType];
  }

  if (animation === "scale") {
    return transitions.scale[animationType];
  }

  return "";
};

const StyledBox = styled(Box)<AnimatedBoxProps>`
  ${({ animation, animationType, direction }) =>
    getTransitionStyle(animation, animationType, direction)}
`;

export const AnimatedBox: FC<AnimatedBoxProps> = ({
  animation = "fade",
  animationType = "enter",
  direction = "right",
  show = true,
  children,
  onExited,
  ...props
}) => {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
    }
  }, [show]);

  const handleAnimationEnd = () => {
    if (!show) {
      setShouldRender(false);
      onExited?.();
    }
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <StyledBox
      animation={animation}
      animationType={show ? "enter" : "exit"}
      direction={direction}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      {children}
    </StyledBox>
  );
};