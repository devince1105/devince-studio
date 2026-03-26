//components/three/HeroBackground.tsx
'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

interface HeroBackgroundProps {
    variant: number
}


//
// ===============================
// Variant 0 — Clean AI Network
// ===============================
//
function NetworkScene() {
    const pointsRef = useRef<THREE.Points>(null)
    const linesRef = useRef<THREE.LineSegments>(null)

    const nodeCount = 100
    const maxConnections = 2
    const maxDistance = 1.4

    // 🔵 建立圓形 sprite texture
    const circleTexture = useMemo(() => {
        const size = 128
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size

        const ctx = canvas.getContext('2d')!

        const gradient = ctx.createRadialGradient(
            size / 2,
            size / 2,
            0,
            size / 2,
            size / 2,
            size / 2
        )

        gradient.addColorStop(0, 'rgba(255,255,255,1)')
        gradient.addColorStop(0.4, 'rgba(255,255,255,1)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')

        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, size, size)

        return new THREE.CanvasTexture(canvas)
    }, [])

    const { positions, colors, linePositions } = useMemo(() => {
        const clusters = 4
        const nodes: number[] = []
        const nodeColors: number[] = []
        const lines: number[] = []

        const palette = [
            new THREE.Color('#3b82f6'),
            new THREE.Color('#10b981'),
            new THREE.Color('#f59e0b'),
            new THREE.Color('#8b5cf6'),
        ]

        const clusterCenters: THREE.Vector3[] = []

        for (let i = 0; i < clusters; i++) {
            clusterCenters.push(
                new THREE.Vector3(
                    (Math.random() - 0.5) * 6,
                    (Math.random() - 0.5) * 4,
                    (Math.random() - 0.5) * 1
                )
            )
        }

        const nodePositions: THREE.Vector3[] = []

        for (let i = 0; i < nodeCount; i++) {
            const clusterIndex = i % clusters
            const center = clusterCenters[clusterIndex]

            const pos = new THREE.Vector3(
                center.x + (Math.random() - 0.5) * 1.2,
                center.y + (Math.random() - 0.5) * 1.2,
                center.z + (Math.random() - 0.5) * 0.6
            )

            nodePositions.push(pos)
            nodes.push(pos.x, pos.y, pos.z)

            const c = palette[clusterIndex]
            nodeColors.push(c.r, c.g, c.b)
        }

        // 🔹 限制連線數量
        for (let i = 0; i < nodePositions.length; i++) {
            const distances: { index: number; dist: number }[] = []

            for (let j = 0; j < nodePositions.length; j++) {
                if (i === j) continue
                const dist = nodePositions[i].distanceTo(nodePositions[j])
                distances.push({ index: j, dist })
            }

            distances.sort((a, b) => a.dist - b.dist)

            for (let k = 0; k < maxConnections; k++) {
                const target = distances[k]
                if (!target) continue

                if (target.dist < maxDistance) {
                    lines.push(
                        nodePositions[i].x,
                        nodePositions[i].y,
                        nodePositions[i].z,
                        nodePositions[target.index].x,
                        nodePositions[target.index].y,
                        nodePositions[target.index].z
                    )
                }
            }
        }

        return {
            positions: new Float32Array(nodes),
            colors: new Float32Array(nodeColors),
            linePositions: new Float32Array(lines),
        }
    }, [])

    useFrame((state) => {
        const t = state.clock.elapsedTime

        if (pointsRef.current) {
            pointsRef.current.rotation.y = t * 0.05
        }
        if (linesRef.current) {
            linesRef.current.rotation.y = t * 0.05
        }
    })

    return (
        <>
            {/* 連線 */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linePositions, 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    color="#94a3b8"
                    transparent
                    opacity={0.08}
                    depthWrite={false}
                />
            </lineSegments>

            {/* 圓形節點 */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        args={[colors, 3]}
                    />
                </bufferGeometry>

                <pointsMaterial
                    size={0.18}
                    vertexColors
                    map={circleTexture}
                    alphaTest={0.1}
                    sizeAttenuation
                    depthWrite={false}
                    transparent
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </>
    )
}

//
// ===============================
// Variant 1 — Hemisphere Sculpt
// ===============================
//
function MatrixCubeScene() {
    const pointsRef = useRef<THREE.Points>(null)

    const { positions, colors } = useMemo(() => {
        const grid = 5
        const spacing = 0.5
        const total = grid * grid * grid

        const pos = new Float32Array(total * 3)
        const col = new Float32Array(total * 3)

        let index = 0

        for (let x = 0; x < grid; x++) {
            for (let y = 0; y < grid; y++) {
                for (let z = 0; z < grid; z++) {

                    const px = (x - grid / 2) * spacing
                    const py = (y - grid / 2) * spacing
                    const pz = (z - grid / 2) * spacing

                    pos[index] = px
                    pos[index + 1] = py
                    pos[index + 2] = pz

                    // 根據高度做 Neon 漸層
                    const t = (y / grid)

                    col[index] = 0
                    col[index + 1] = t
                    col[index + 2] = 1

                    index += 3
                }
            }
        }

        return { positions: pos, colors: col }
    }, [])

    useFrame((state) => {
        const t = state.clock.elapsedTime
        if (pointsRef.current) {
            pointsRef.current.rotation.y = t * 0.2
            pointsRef.current.rotation.x = Math.sin(t * 0.2) * 0.1
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                {/* ✅ 正確：position 用 positions */}
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
                {/* ✅ color 用 colors */}
                <bufferAttribute
                    attach="attributes-color"
                    args={[colors, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.1}
                vertexColors
                sizeAttenuation
                depthWrite={false}
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}
//
// ===============================
// Variant 2 — Deep Space
// ===============================
//
function SpaceScene() {
    const pointsRef = useRef<THREE.Points>(null)

    const { positions } = useMemo(() => {
        const nodes: number[] = []

        for (let i = 0; i < 300; i++) {
            const radius = 4 + Math.random() * 6
            const theta = Math.random() * Math.PI * 2
            const phi = Math.acos(Math.random() * 2 - 1)

            const x = radius * Math.sin(phi) * Math.cos(theta)
            const y = radius * Math.sin(phi) * Math.sin(theta)
            const z = radius * Math.cos(phi)

            nodes.push(x, y, z)
        }

        return {
            positions: new Float32Array(nodes),
        }
    }, [])

    useFrame((state) => {
        const t = state.clock.elapsedTime
        if (pointsRef.current) {
            pointsRef.current.rotation.y = t * 0.03
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.12}
                color="#38bdf8"
                sizeAttenuation
                depthWrite={false}
                transparent
            />
        </points>
    )
}

//
// ===============================
// Main Hero Background
// ===============================
//
export default function HeroBackground({ variant }: HeroBackgroundProps) {
    return (
        <Canvas
            camera={{ position: [0, 0, 4], fov: 50 }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
        >
            {variant === 0 && <NetworkScene />}
            {variant === 1 && <MatrixCubeScene />}
            {variant === 2 && <SpaceScene />}
        </Canvas>
    )
}