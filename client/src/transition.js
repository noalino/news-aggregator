const duration = 150;

const defaultStyle = {
  transition: `transform ${duration}ms ease-out,
                   opacity ${duration * 2}ms ease-in`,
};

const transitionStyles = {
  entering: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
  entered: {
    opacity: 1,
    transform: 'translateY(0)',
  },
};

export {
  duration,
  defaultStyle,
  transitionStyles,
};
