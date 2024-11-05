declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}



declare module 'react-dom/client' {
  import { ReactNode } from 'react';
  import { Root } from 'react-dom';

  interface Root {
    render(children: ReactNode): void;
    unmount(): void;
  }

  function createRoot(container: Element | DocumentFragment): Root;
  export { createRoot };
}
