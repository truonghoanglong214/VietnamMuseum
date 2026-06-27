import React, { useRef, useEffect } from 'react'
import { Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, N8AO, Vignette, SMAA } from '@react-three/postprocessing'
import { rooms, exhibits } from '../museumData.js'
import Room from './Room.jsx'
import Frame from './Frame.jsx'
import Player from './Player.jsx'
import DecoTree from './DecoTree.jsx'
import {
  BenchProp, PedestalProp, RopeBarrierProp,
  InfoStandProp, ColumnProp, StarDecorProp,
  PillarProp, SuggestionBoxProp
} from './RoomProps.jsx'
import WanderNPC, { PointNPC } from './NPC.jsx'
import {
  TrongDongModel, ReceptionDeskModel, SocratesModel,
  SpartanHelmetModel, SpartanShieldModel, AncientScrollModel,
  GreekColumnModel, GoddessOfJusticeModel, CrownModel,
  HammerSickleModel, TorchModel, WheatFieldModel,
  GearModel, BrownBookModel, GlobeModel,
  OnePillarPagodaModel, LotusFlowerModel
} from './GLTFModels.jsx'

function SpotlightOnExhibit({ from, to, intensity = 28, color = '#fff5e0' }) {
  const ref = useRef()
  useEffect(() => { if (ref.current) ref.current.target.position.set(...to) }, [])
  return (
    <>
      <spotLight
        ref={ref}
        position={from}
        intensity={intensity}
        angle={0.32}
        penumbra={0.45}
        color={color}
        castShadow={false}
      />
      <primitive object={ref.current?.target ?? { position: { set: () => {} } }} />
    </>
  )
}

// Đèn trần hộp phát sáng + nguồn sáng điểm — phong cách đèn chùm bảo tàng
function Fixture({ position, intensity = 20, roomHeight = 5 }) {
  const dropY = roomHeight - 0.4
  return (
    <group position={[position[0], dropY, position[2]]}>
      {/* hộp đèn */}
      <mesh>
        <boxGeometry args={[0.55, 0.05, 0.55]} />
        <meshStandardMaterial color="#fff8ea" emissive="#ffe8a0" emissiveIntensity={2.5} />
      </mesh>
      {/* vành khung mỏng */}
      <mesh>
        <boxGeometry args={[0.62, 0.02, 0.62]} />
        <meshStandardMaterial color="#c4a84a" metalness={0.8} roughness={0.3} />
      </mesh>
      <pointLight
        position={[0, -0.35, 0]}
        intensity={intensity}
        distance={14}
        decay={2}
        color="#ffeccb"
      />
    </group>
  )
}

export default function Museum({ controlsRef, onSelect, onLockChange }) {
  return (
    <>
      <color attach="background" args={['#0c0a07']} />
      {/* Fog nhẹ — tầm nhìn ~80m để còn thấy vài phòng phía trước */}
      <fog attach="fog" args={['#0c0a07', 16, 95]} />

      {/* Ánh sáng nền ấm */}
      <ambientLight intensity={0.28} color="#f0e6cf" />
      <hemisphereLight intensity={0.3} color="#2c271f" groundColor="#0a0806" />

      {/* ── Spotlight chiếu tranh chủ đạo ── */}

      {/* Lobby */}
      <SpotlightOnExhibit from={[0, 4.5, -2.5]} to={[0, 2.8, -4.88]} intensity={28} />

      {/* Phòng 1 */}
      <SpotlightOnExhibit from={[18, 4.5, -2.5]} to={[18, 2.8, -4.88]} intensity={30} color="#fff3d0" />

      {/* Phòng 2 */}
      <SpotlightOnExhibit from={[36, 4.5, -2.5]} to={[36, 2.8, -4.88]} intensity={28} color="#ffeac0" />

      {/* Phòng 3 */}
      <SpotlightOnExhibit from={[54, 4.5, -2.5]} to={[54, 2.8, -4.88]} intensity={35} color="#ffd0b0" />

      {/* Phòng 4 */}
      <SpotlightOnExhibit from={[72, 4.5, -2.5]} to={[72, 2.8, -4.88]} intensity={30} />

      {/* Phòng Kết */}
      <SpotlightOnExhibit from={[91, 4.5, 0.5]} to={[95.88, 2.6, 0]} intensity={32} />

      {/* Lightformer phản chiếu môi trường (không cần HDRI) */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={1.2} color="#fff3da" position={[0,  6,  0]}  scale={[20, 8, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={0.6} color="#cdbfa4" position={[0,  2, -12]} scale={[24, 6, 1]} />
        <Lightformer form="rect" intensity={0.6} color="#cdbfa4" position={[0,  2,  12]} scale={[24, 6, 1]} rotation-y={Math.PI} />
        <Lightformer form="rect" intensity={0.4} color="#e8d8b0" position={[50, 2,   0]} scale={[1, 6, 24]} />
      </Environment>

      {/* ── Đèn trần từng phòng và hành lang ── */}

      {/* Lobby (x=0) */}
      <Fixture position={[-3,  0, 0]} intensity={22} roomHeight={5} />
      <Fixture position={[ 3,  0, 0]} intensity={22} roomHeight={5} />

      {/* Hành lang 1 (x=9) */}
      <Fixture position={[9, 0, 0]} intensity={10} roomHeight={3.6} />

      {/* Phòng 1 (x=18) */}
      <Fixture position={[15, 0, 0]} intensity={22} roomHeight={5} />
      <Fixture position={[21, 0, 0]} intensity={22} roomHeight={5} />

      {/* Hành lang 2 (x=27) */}
      <Fixture position={[27, 0, 0]} intensity={10} roomHeight={3.6} />

      {/* Phòng 2 (x=36) */}
      <Fixture position={[33, 0, 0]} intensity={22} roomHeight={5} />
      <Fixture position={[39, 0, 0]} intensity={22} roomHeight={5} />

      {/* Hành lang 3 (x=45) */}
      <Fixture position={[45, 0, 0]} intensity={10} roomHeight={3.6} />

      {/* Phòng 3 (x=54) */}
      <Fixture position={[51, 0, 0]} intensity={22} roomHeight={5} />
      <Fixture position={[57, 0, 0]} intensity={22} roomHeight={5} />

      {/* Hành lang 4 (x=63) */}
      <Fixture position={[63, 0, 0]} intensity={10} roomHeight={3.6} />

      {/* Phòng 4 (x=72) */}
      <Fixture position={[69, 0, 0]} intensity={22} roomHeight={5} />
      <Fixture position={[75, 0, 0]} intensity={22} roomHeight={5} />

      {/* Hành lang 5 (x=81) */}
      <Fixture position={[81, 0, 0]} intensity={10} roomHeight={3.6} />

      {/* Phòng kết (x=90) */}
      <Fixture position={[87, 0, 0]} intensity={22} roomHeight={5} />
      <Fixture position={[93, 0, 0]} intensity={22} roomHeight={5} />

      {/* ── Phòng ── */}
      {rooms.map((r) => (
        <Room key={r.id} room={r} />
      ))}

      {/* ── Tranh treo tường ── */}
      {exhibits.map((ex, i) => (
        <Frame key={i} exhibit={ex} onSelect={onSelect} />
      ))}

      {/* ── LOBBY ── */}
      <DecoTree position={[-5, 0, -3.5]} type="palm" />
      <DecoTree position={[ 5, 0, -3.5]} type="palm" />
      <BenchProp position={[-2.5, 0, 3]} rotation={[0, 0, 0]} />
      <BenchProp position={[ 2.5, 0, 3]} rotation={[0, 0, 0]} />
      <InfoStandProp position={[4, 0, 0]} rotation={[0, Math.PI, 0]} text="Kính chào quý khách đến tham quan" />
      <mesh position={[2, 0.005, 0]} receiveShadow>
        <boxGeometry args={[4, 0.01, 2]} />
        <meshStandardMaterial color="#6b1010" roughness={0.9} />
      </mesh>
      {/* GLTF Assets Lobby */}
      <TrongDongModel position={[0, 0, 0]} />
      <ReceptionDeskModel position={[-3.5, 0, -1]} rotation={[0, Math.PI / 2, 0]} />
      <PointNPC position={[3, 0, 0.8]} lookAt={[0, 1.6, 0]} id={0} />
      <WanderNPC startPos={[-1, 0, 1]} id={1} />

      {/* ── PHÒNG 1 ── */}
      <DecoTree position={[14.5, 0, -3]} type="shrub" />
      <ColumnProp position={[14, 0, 2]} height={3.0} />
      <ColumnProp position={[22, 0, 2]} height={3.0} />
      <PedestalProp position={[18, 0, 1.5]} height={0.9} color="#e8dfc0">
        <SocratesModel position={[0, 0.955, 0]} />
      </PedestalProp>
      <BenchProp position={[18, 0, 3.5]} />
      {/* GLTF Assets Phòng 1 */}
      <SpartanHelmetModel position={[15.5, 0, -1.8]} rotation={[0, Math.PI / 4, 0]} />
      <SpartanShieldModel position={[20.5, 0, -2.2]} rotation={[0.2, -Math.PI / 6, 0]} />
      <AncientScrollModel position={[18, 0, -2.2]} />
      <GreekColumnModel position={[13.5, 0, -3]} />
      <GreekColumnModel position={[22.5, 0, -3]} />
      <PointNPC position={[18, 0, -2.5]} lookAt={[18, 2.8, -4.88]} id={2} />
      <WanderNPC startPos={[15, 0, 1]} id={3} exhibitPos={[18, 2.8, -4.88]} />

      {/* ── PHÒNG 2 ── */}
      <DecoTree position={[33, 0, 3.5]} type="shrub" />
      <DecoTree position={[39, 0, 3.5]} type="shrub" />
      <PedestalProp position={[33, 0, 0]} height={0.9} color="#f0ede0">
        <CrownModel position={[0, 0.955, 0]} />
      </PedestalProp>
      <PedestalProp position={[36, 0, 0]} height={0.6} color="#8a8078">
        <GoddessOfJusticeModel position={[0, 0.655, 0]} />
      </PedestalProp>
      <PedestalProp position={[39, 0, 0]} height={0.75} color="#d4c9a0" />
      <RopeBarrierProp posts={[[31.5, -1.3],[31.5, 1.3],[40.5, 1.3],[40.5, -1.3],[31.5, -1.3]]} />
      <WanderNPC startPos={[33, 0, 2]} id={4} exhibitPos={[36, 2.8, -4.88]} />
      <WanderNPC startPos={[39, 0, 2]} id={5} exhibitPos={[36, 2.8, -4.88]} />

      {/* ── PHÒNG 3 ── */}
      <DecoTree position={[51, 0, 3.5]} type="palm" />
      <StarDecorProp position={[51.2, 3.2, -4.82]} size={0.28} />
      <StarDecorProp position={[56.8, 3.2, -4.82]} size={0.28} />
      <mesh position={[54, 3.8, 0]}>
        <boxGeometry args={[6, 0.22, 0.025]} />
        <meshStandardMaterial color="#8b0000" roughness={0.9} />
      </mesh>
      <PedestalProp position={[54, 0, 1.5]} height={0.8} color="#8b2020">
        <HammerSickleModel position={[0, 0.855, 0]} />
      </PedestalProp>
      <BenchProp position={[51, 0, 3]} />
      <BenchProp position={[57, 0, 3]} />
      {/* GLTF Assets Phòng 3 */}
      <TorchModel position={[51, 0, -3.2]} />
      <TorchModel position={[57, 0, -3.2]} />
      <PointNPC position={[54, 0, -2]} lookAt={[54, 2.8, -4.88]} id={6} />
      <WanderNPC startPos={[51, 0, 2]} id={7} exhibitPos={[54, 2.8, -4.88]} />

      {/* ── PHÒNG 4 ── */}
      <DecoTree position={[68, 0, 3.5]} type="shrub" />
      <DecoTree position={[76, 0, 3.5]} type="shrub" />
      <PillarProp position={[69, 0, 0]} color="#8b2020" topSymbol="star" />
      <PillarProp position={[72, 0, 0]} color="#c4a84a" topSymbol="gear" />
      <PillarProp position={[75, 0, 0]} color="#1a2060" topSymbol="book" />
      <RopeBarrierProp posts={[[67.5,-1.4],[67.5,1.4],[76.5,1.4],[76.5,-1.4],[67.5,-1.4]]} />
      <SpotlightOnExhibit from={[69, 4.5, 0]} to={[69, 0, 0]} intensity={20} color="#ffcccc" />
      <SpotlightOnExhibit from={[72, 4.5, 0]} to={[72, 0, 0]} intensity={20} color="#ffe8a0" />
      <SpotlightOnExhibit from={[75, 4.5, 0]} to={[75, 0, 0]} intensity={20} color="#aaccff" />
      {/* GLTF Assets Phòng 4 */}
      <WheatFieldModel position={[69, 0, -2]} />
      <GearModel position={[72, 0, -2]} />
      <BrownBookModel position={[75, 0, -2]} />
      <GlobeModel position={[72, 0, 2.5]} />
      <PointNPC position={[69, 0, 1.8]} lookAt={[69, 1.5, 0]} id={8} />
      <PointNPC position={[72, 0, 1.8]} lookAt={[72, 1.5, 0]} id={9} />
      <PointNPC position={[75, 0, 1.8]} lookAt={[75, 1.5, 0]} id={10} />

      {/* ── PHÒNG KẾT ── */}
      <DecoTree position={[85, 0, 3.5]} type="palm" />
      <DecoTree position={[95, 0, 3.5]} type="palm" />
      <BenchProp position={[87, 0, 3]} />
      <BenchProp position={[93, 0, 3]} />
      <SuggestionBoxProp position={[90, 0, 2.5]} />
      <mesh position={[90, 4.3, 0]}>
        <boxGeometry args={[7, 0.2, 0.025]} />
        <meshStandardMaterial color="#c4a84a" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* GLTF Assets Phòng Kết */}
      <OnePillarPagodaModel position={[90, 0, -0.5]} scale={0.0055} />
      <LotusFlowerModel position={[88.5, 0, -1]} scale={0.6} />
      <LotusFlowerModel position={[91.5, 0, -1]} scale={0.6} />
      <PointNPC position={[93, 0, -2]} lookAt={[95.88, 2.6, 0]} id={11} />
      <WanderNPC startPos={[88, 0, 2]} id={12} exhibitPos={[95.88, 2.6, 0]} />

      <Player controlsRef={controlsRef} onLockChange={onLockChange} />

      {/* Hậu kỳ: đổ bóng góc, nở sáng nhẹ, làm tối viền */}
      <EffectComposer enableNormalPass multisampling={0}>
        <N8AO aoRadius={0.7} intensity={1.6} distanceFalloff={0.9} />
        <Bloom mipmapBlur luminanceThreshold={0.82} intensity={0.45} />
        <Vignette eskil={false} offset={0.22} darkness={0.65} />
        <SMAA />
      </EffectComposer>
    </>
  )
}
