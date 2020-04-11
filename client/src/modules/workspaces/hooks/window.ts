
export function windowResize(handleEffect: () => void) {

  return () => {

    window.addEventListener('resize', handleEffect);

    return () => {
      window.removeEventListener('resize', handleEffect);
    };

  }
}
