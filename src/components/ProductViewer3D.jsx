import { lazy, Suspense, useState } from 'react';
import ImageRotateViewer from './ImageRotateViewer';
import ModelErrorBoundary from './ModelErrorBoundary';

// The 3D code is only downloaded when a dish actually has a 3D model (lazy-loaded).
const ModelCanvas = lazy(() => import('./ModelCanvas'));

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

// Shows the 3D model when the dish has a glbUrl and the browser supports WebGL.
// Otherwise (no model, no WebGL, or the model fails to load) it shows the static image.
export default function ProductViewer3D({ image, name, glbUrl, bare = false }) {
  const [webgl] = useState(supportsWebGL);
  const fallback = bare ? (
    <img src={image} alt={name} className="w-full h-full object-cover" />
  ) : (
    <ImageRotateViewer image={image} name={name} />
  );

  if (!glbUrl || !webgl) return fallback;

  return (
    <ModelErrorBoundary key={glbUrl} fallback={fallback}>
      <Suspense fallback={fallback}>
        <ModelCanvas url={glbUrl} name={name} bare={bare} />
      </Suspense>
    </ModelErrorBoundary>
  );
}
