export const framerContainerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
}

export const framerItemVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'linear',
      duration: 0.02
    }
  }
}

export const fadeInOutFromTop = {
  initial: {
    opacity: 0,
    y: -75
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3
    }
  },
  out: {
    opacity: 0,
    y: -75,
    transition: {
      duration: 0.3
    }
  }
}
