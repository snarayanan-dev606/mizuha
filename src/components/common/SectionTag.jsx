import React from 'react';

/**
 * Editorial category tag pill for section branding
 */
export const SectionTag = ({ children, color }) => (
  <div className="section-tag" style={color ? { color } : undefined}>
    {children}
  </div>
);

export default SectionTag;

