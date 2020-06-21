import { Tools } from 'core/tools';

export function toolShortcut(handleEffect: (tool: Tools) => void) {

  return () => {

    const keyHandler = (e: KeyboardEvent) => {
      switch(e.key) {
        case '1':
          return handleEffect(Tools.PENCIL);
        case '2':
          return handleEffect(Tools.RECTANGLE);
        case '3':
          return handleEffect(Tools.ELLIPSE);
        default:
          return;
      }
    }

    document.addEventListener('keydown', keyHandler);

    return () => {
      document.removeEventListener('keydown', keyHandler);
    }
  };

}