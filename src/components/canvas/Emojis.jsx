import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';

import CanvasLoader from '../Loader';

const Emojis = () => {
    const { scene } = useGLTF('./emojis/smiley4.gltf');

    return (

        <mesh>
            <hemisphereLight intensity={2} groundColor="white" />
            <pointLight intensity={2} />
            <spotLight
                intensity={10}
                position={[-20, 100, 10]}
                angle={0.12}
                penumbra={1}
                castShadow
                shadow-mapSize={1024}
            />
            <primitive
                object={scene}
                scale={0.7}
                position={[0, -0.3, -0.3]}
                rotation={[0, -0.2, -0.1]}
            />
        </mesh>

    );
};

const EmojiCanvas = () => {
    return (
        <Canvas
            frameloop="demand"
            shadows
            camera={{ position: [20, 3, 5], fov: 25 }}
            gl={{ preserveDrawingBuffer: true }}
        >
            <Suspense fallback={<CanvasLoader />}>
                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 2}
                />
                <Emojis />
            </Suspense>
            <Preload all />
        </Canvas>
    );
}

export default EmojiCanvas;
