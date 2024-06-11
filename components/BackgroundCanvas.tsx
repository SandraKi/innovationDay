'use client'
import { Canvas } from '@react-three/fiber'
import { Box, Environment, OrbitControls } from '@react-three/drei'

const BackgroundCanvas = () => {
  return (
    <Canvas
      style={{
        height: '100dvh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      <ambientLight intensity={0.5} />
      <Box>
        <meshStandardMaterial color="hotpink" />
      </Box>
      <Environment preset="sunset" />
      <OrbitControls />
    </Canvas>
  )
}
export default BackgroundCanvas
