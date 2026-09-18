import React from 'react';
import { Composition } from 'remotion';
import { Main } from './Main';
import { FPS, W, H } from './tokens';
import { totalDurationInFrames } from './timeline';

export const Root: React.FC = () => (
  <Composition
    id="DEWAWalkMe"
    component={Main}
    defaultProps={{}}
    durationInFrames={totalDurationInFrames}
    fps={FPS}
    width={W}
    height={H}
  />
);
