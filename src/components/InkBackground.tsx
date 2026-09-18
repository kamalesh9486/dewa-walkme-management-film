import React from 'react';
import { RichBackground } from './RichBackground';

export const InkBackground: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <RichBackground>{children}</RichBackground>
);
