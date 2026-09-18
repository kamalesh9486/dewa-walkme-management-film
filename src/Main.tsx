import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { S01Principle } from './scenes/S01Principle';
import { S02Friction }  from './scenes/S02Friction';
import { S03Guidance }  from './scenes/S03Guidance';
import { S04Action }    from './scenes/S04Action';
import { S05Streams }   from './scenes/S05Streams';
import { S06Management }from './scenes/S06Management';
import { S07Delay }     from './scenes/S07Delay';
import { S08Roadmap }   from './scenes/S08Roadmap';
import { S09Decision }  from './scenes/S09Decision';
import { sceneBounds as b, durationOf } from './timeline';
import { C } from './tokens';

const scenes = [
  { key: 'principle' as const, Comp: S01Principle, audio: 'audio/scene1.mp3' },
  { key: 'friction'  as const, Comp: S02Friction,  audio: 'audio/scene2.mp3' },
  { key: 'guidance'  as const, Comp: S03Guidance,  audio: 'audio/scene3.mp3' },
  { key: 'action'    as const, Comp: S04Action,    audio: 'audio/scene4.mp3' },
  { key: 'streams'   as const, Comp: S05Streams,   audio: 'audio/scene5.mp3' },
  { key: 'case'      as const, Comp: S06Management,audio: 'audio/scene6.mp3' },
  { key: 'delay'     as const, Comp: S07Delay,     audio: 'audio/scene7.mp3' },
  { key: 'roadmap'   as const, Comp: S08Roadmap,   audio: 'audio/scene8.mp3' },
  { key: 'decision'  as const, Comp: S09Decision,  audio: 'audio/scene9.mp3' },
];

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: C.bg }}>
    {/* Background music — plays throughout at low volume */}
    <Audio src={staticFile('audio/bg-music.mp3')} volume={0.09} loop />

    {scenes.map(({ key, Comp, audio }) => {
      const bounds = b[key];
      const dur    = durationOf(bounds);
      return (
        <Sequence key={key} from={bounds.from} durationInFrames={dur} name={key}>
          <Audio src={staticFile(audio)} startFrom={0} />
          <Comp />
        </Sequence>
      );
    })}
  </AbsoluteFill>
);
