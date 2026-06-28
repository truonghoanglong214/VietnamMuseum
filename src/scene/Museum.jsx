import React, { useRef, useEffect } from 'react'
import { Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, N8AO, Vignette, SMAA } from '@react-three/postprocessing'
import { rooms, exhibits } from '../museumData.js'
import Room from './Room.jsx'
import Frame from './Frame.jsx'
import Player from './Player.jsx'
import InteractSystem from './InteractSystem.jsx'
import DecoTree from './DecoTree.jsx'
import {
  BenchProp, PedestalProp, RopeBarrierProp,
  InfoStandProp, ColumnProp, StarDecorProp,
  SuggestionBoxProp
} from './RoomProps.jsx'
import WanderNPC, { PointNPC } from './NPC.jsx'
import {
  TrongDongModel, ReceptionDeskModel, TribeStaffModel, SocratesModel,
  SpartanHelmetModel, TuongBacModel, AncientScrollModel,
  GreekColumnModel, GoddessOfJusticeModel, RoundChainModel, CrownModel, OpenBookModel, MoneyStacksModel,
  HammerSickleModel, TorchModel, WheatFieldModel,
  GearModel, GrowthCoinsModel, BrownBookModel, GlobeModel,
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

export default function Museum({ controlsRef, onSelect, onLockChange, onNearestChange, nearestInteractable, onInteract, onRoomChange }) {
  return (
    <>
      <InteractSystem onNearestChange={onNearestChange} onRoomChange={onRoomChange} />
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

      {/* Phòng 3 (Tranh Bắc & Nam) */}
      <SpotlightOnExhibit from={[54, 4.5, -2.5]} to={[54, 2.8, -4.88]} intensity={35} color="#ffd0b0" />
      <SpotlightOnExhibit from={[54, 4.5, 2.5]} to={[54, 2.8, 4.88]} intensity={32} color="#ffe0c0" />

      {/* Phòng 4 */}
      <SpotlightOnExhibit from={[72, 4.5, -2.5]} to={[72, 2.8, -4.88]} intensity={30} />

      {/* Phòng Kết (Tranh Đông & Bắc) */}
      <SpotlightOnExhibit from={[91, 4.5, 0.5]} to={[95.88, 2.6, 0]} intensity={32} />
      <SpotlightOnExhibit from={[90, 4.5, -2.5]} to={[90, 2.8, -4.88]} intensity={32} color="#fff0d0" />

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
      <BenchProp position={[-2.5, 0, 3]} rotation={[0, Math.PI, 0]} />
      <BenchProp position={[ 2.5, 0, 3]} rotation={[0, Math.PI, 0]} />
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
      <PedestalProp position={[18, 0, 1.5]} height={0.9} color="#e8dfc0" title="Gậy Thù Trưởng (Dân Chủ Nguyên Thủy)" plaqueSide="back">
        <TribeStaffModel position={[0, 0.955, 0]} rotation={[0, Math.PI, 0]} />
      </PedestalProp>
      <BenchProp position={[18, 0, 3.5]} />
      {/* GLTF Assets Phòng 1 — Đặt các hiện vật lên bệ trưng bày */}
      <PedestalProp position={[15.5, 0, -1.8]} height={0.8} color="#e8dfc0" title="Nón Chiến Binh Spartan">
        <SpartanHelmetModel position={[0, 0.855, 0]} rotation={[0, Math.PI / 4, 0]} />
      </PedestalProp>
      <PedestalProp position={[20.5, 0, -1.8]} height={0.8} color="#e8dfc0" title="Tượng Chủ tịch Hồ Chí Minh">
        <TuongBacModel position={[0, 0.855, 0]} rotation={[0, Math.PI / 2, 0]} />
      </PedestalProp>
      <PedestalProp position={[18, 0, -2.0]} height={0.7} color="#d4c9a0" title="Cuộn Sách Cổ Hy Lạp">
        <AncientScrollModel position={[0, 0.755, 0]} />
      </PedestalProp>
      <GreekColumnModel position={[13.5, 0, -3]} />
      <GreekColumnModel position={[22.5, 0, -3]} />
      <PointNPC position={[18, 0, -3.2]} lookAt={[18, 2.8, -4.88]} id={2} />
      <WanderNPC startPos={[15, 0, 1]} id={3} exhibitPos={[18, 2.8, -4.88]} />

      {/* ── PHÒNG 2 ── */}
      <DecoTree position={[33, 0, 3.5]} type="shrub" />
      <DecoTree position={[39, 0, 3.5]} type="shrub" />
      <PedestalProp position={[33, 0, 0]} height={0.65} color="#4a443f" title="Xiềng Xích Nô Lệ">
        <RoundChainModel position={[0, 0.705, 0]} />
      </PedestalProp>
      <PedestalProp position={[36, 0, 0]} height={0.9} color="#f0ede0" title="Vương Miện Phong Kiến">
        <CrownModel position={[0, 0.955, 0]} />
      </PedestalProp>
      <PedestalProp position={[39, 0, 0]} height={0.75} color="#d4c9a0" title="Cập Tiền Tư Sản">
        <MoneyStacksModel position={[0, 0.805, 0]} />
      </PedestalProp>
      <RopeBarrierProp posts={[[31.5, -1.3],[31.5, 1.3],[40.5, 1.3],[40.5, -1.3],[31.5, -1.3]]} />
      <WanderNPC startPos={[33, 0, 2]} id={4} exhibitPos={[36, 2.8, -4.88]} />
      <WanderNPC startPos={[39, 0, 2]} id={5} exhibitPos={[36, 2.8, -4.88]} />

      {/* ── PHÒNG 3 ── */}
      <DecoTree position={[51, 0, 3.5]} type="palm" />
      <mesh position={[54, 3.8, 0]}>
        <boxGeometry args={[6, 0.22, 0.025]} />
        <meshStandardMaterial color="#8b0000" roughness={0.9} />
      </mesh>
      <PedestalProp position={[54, 0, 1.5]} height={0.8} color="#8b2020" title="Biểu Tượng Búa Liềm">
        <HammerSickleModel position={[0, 0.855, 0]} />
      </PedestalProp>
      <BenchProp position={[51, 0, 3]} />
      <BenchProp position={[57, 0, 3]} />
      {/* GLTF Assets Phòng 3 — 3 Ngọn đuốc Cách mạng */}
      <TorchModel position={[49.5, 0, -3.2]} />
      <TorchModel position={[54, 0, -3.2]} />
      <TorchModel position={[58.5, 0, -3.2]} />
      <PointNPC position={[54, 0, -1.5]} lookAt={[54, 2.8, -4.88]} id={6} />
      <WanderNPC startPos={[51, 0, 2]} id={7} exhibitPos={[54, 2.8, -4.88]} />

      {/* ── PHÒNG 4 ── */}
      <DecoTree position={[68, 0, 3.5]} type="shrub" />
      <DecoTree position={[76, 0, 3.5]} type="shrub" />
      
      {/* 3 Bệ trưng bày hiện vật Phòng 4 */}
      <PedestalProp position={[68.4, 0, 0]} height={0.8} color="#1a2060" title="Sách Lý Luận & Tri Thức">
        <BrownBookModel position={[0, 0.855, 0]} />
      </PedestalProp>
      <PedestalProp position={[71.8, 0, 0]} height={0.8} color="#c4a84a" title="Tăng Trưởng Kinh Tế & Công Hữu">
        <GrowthCoinsModel position={[0, 0.855, 0]} />
      </PedestalProp>
      <PedestalProp position={[75.2, 0, 0]} height={0.8} color="#2e5a36" title="Quả Địa Cầu — Tư Tưởng & Văn Hóa">
        <GlobeModel position={[0, 0.855, 0]} />
      </PedestalProp>

      <RopeBarrierProp posts={[[67.2,-1.4],[67.2,1.4],[76.6,1.4],[76.6,-1.4],[67.2,-1.4]]} />
      
      <SpotlightOnExhibit from={[68.4, 4.5, 0]} to={[68.4, 0, 0]} intensity={20} color="#aaccff" />
      <SpotlightOnExhibit from={[71.8, 4.5, 0]} to={[71.8, 0, 0]} intensity={20} color="#ffe8a0" />
      <SpotlightOnExhibit from={[75.2, 4.5, 0]} to={[75.2, 0, 0]} intensity={20} color="#d0ffcc" />

      <PointNPC position={[68.4, 0, 1.8]} lookAt={[68.4, 1.0, 0]} id={8} />
      <PointNPC position={[71.8, 0, 1.8]} lookAt={[71.8, 1.0, 0]} id={9} />
      <PointNPC position={[75.2, 0, 1.8]} lookAt={[75.2, 1.0, 0]} id={10} />

      {/* ── PHÒNG KẾT ── */}
      <DecoTree position={[85, 0, 3.5]} type="palm" />
      <DecoTree position={[95, 0, 3.5]} type="palm" />
      <BenchProp position={[87, 0, 3]} />
      <BenchProp position={[93, 0, 3]} />
      {/* GLTF Assets Phòng Kết */}
      <PedestalProp position={[90, 0, 0]} height={0.8} color="#e8dfc0" title="Chùa Một Cột">
        <OnePillarPagodaModel position={[0, 0.855, 0]} targetSize={0.75} />
      </PedestalProp>
      <PedestalProp position={[88.5, 0, 0]} height={0.65} color="#e8dfc0" title="Hoa Sen Việt Nam">
        <LotusFlowerModel position={[0, 0.705, 0]} targetSize={0.45} />
      </PedestalProp>
      <PedestalProp position={[91.5, 0, 0]} height={0.65} color="#e8dfc0" title="Hoa Sen Việt Nam">
        <LotusFlowerModel position={[0, 0.705, 0]} targetSize={0.45} />
      </PedestalProp>
      <PointNPC position={[93, 0, -2]} lookAt={[95.88, 2.6, 0]} id={11} />
      <WanderNPC startPos={[88, 0, 2]} id={12} exhibitPos={[95.88, 2.6, 0]} />

      <Player
        controlsRef={controlsRef}
        onLockChange={onLockChange}
        nearestInteractable={nearestInteractable}
        onInteract={onInteract}
      />

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
