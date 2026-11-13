import { Canvas } from '@react-three/fiber';
import { Bounds, Center, OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}

// Real 3D viewer. Stable camera, natural lights, and the plate turns only while it is
// dragged (OrbitControls with damping, no auto-rotate, no zoom, no pan).
export default function ModelCanvas({ url, name }) {
  return (
    <div
      className="relative w-full h-80 md:h-full min-h-[18rem] overflow-hidden"
      style={{ touchAction: 'pan-y' }}
      role="group"
      aria-label={`${name}. 3D model. Drag to rotate the plate.`}
    >
      <Canvas camera={{ position: [0, 1.5, 4], fov: 35 }} dpr={[1, 2]}>
        <ambientLight intensity={0.9} />
        <hemisphereLight args={['#ffffff', '#d9e4de', 0.6]} />
        <directionalLight position={[4, 6, 3]} intensity={1.4} />

        <Bounds fit clip observe margin={1.7}>
          <Model url={url} />
        </Bounds>
        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false}
          enableDamping
          dampingFactor={0.06}
          rotateSpeed={0.5}
          minPolarAngle={Math.PI / 2.6}
          maxPolarAngle={Math.PI / 2.6}
        />
      </Canvas>
    </div>
  );
}