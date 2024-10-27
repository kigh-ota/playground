'use client';

import { useEffect } from 'react';
import styles from './page.module.css';
import { start } from './game';

const WIDTH = 800;
const HEIGHT = 600;

export default function Home() {
  useEffect(() => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    start(canvas);
  });

  return (
    <>
      <main>
        Hello
        <br />
        <canvas
          id="canvas"
          width={WIDTH}
          height={HEIGHT}
          style={{ border: '1px solid' }}
        ></canvas>
      </main>
    </>
  );
}
