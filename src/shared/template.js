// ============================================================================
// Template Constants — Template system runtime defaults
// Expanded for 21 template variants across 10 families
// ============================================================================

import { TEMPLATE_REGISTRY, LEGACY_TEMPLATE_MAP } from '../templates/templateRegistry.js';

/** Default color palettes per template — dynamically built from registry */
export const TEMPLATE_COLORS = {};
/** Default typography per template — dynamically built from registry */
export const TEMPLATE_TYPOGRAPHY = {};

// Build TEMPLATE_COLORS and TEMPLATE_TYPOGRAPHY from the registry
for (const [id, config] of Object.entries(TEMPLATE_REGISTRY)) {
  TEMPLATE_COLORS[id] = {
    light: config.colors.light,
    dark: config.colors.dark,
  };
  TEMPLATE_TYPOGRAPHY[id] = { ...config.typography };
}

// Add legacy template ID aliases so old code still resolves
for (const [legacyId, newId] of Object.entries(LEGACY_TEMPLATE_MAP)) {
  if (!TEMPLATE_COLORS[legacyId] && TEMPLATE_COLORS[newId]) {
    TEMPLATE_COLORS[legacyId] = TEMPLATE_COLORS[newId];
    TEMPLATE_TYPOGRAPHY[legacyId] = TEMPLATE_TYPOGRAPHY[newId];
  }
}
