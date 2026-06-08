import { createContext, useContext } from 'react';

/** Context for the current template family and variant. */
export const TemplateContext = createContext({
  templateId: 'hybrid-flex',
  family: 'hybrid',
  sectionOverrides: {},
});

export function useTemplateContext() {
  return useContext(TemplateContext);
}
