# Bảo tàng 3D Việt Nam — starter (React Three Fiber)

Một bảo tàng 3D đi lại được trong trình duyệt: nhiều phòng nối nhau, treo ảnh trong khung kính, đặt mô hình (trống đồng Đông Sơn, bình gốm, cây), đèn rọi và hậu kỳ cho cảm giác chân thật.

## Chạy thử

Cần Node.js 18+.

```bash
npm install
npm run dev
```

Mở `http://localhost:5173`, nhấn để vào, dùng **WASD** để đi, **chuột** để nhìn, **Esc** để thả chuột, **nhấn vào hiện vật** để xem chú thích.

Build bản tĩnh để đưa lên hosting:

```bash
npm run build      # ra thư mục dist/
npm run preview    # xem thử bản build
```

## Sửa nội dung — chỉ một file

Toàn bộ phòng và hiện vật nằm trong **`src/museumData.js`**. Không cần đụng code 3D.

**Treo ảnh thật:** bỏ ảnh vào `public/images/`, rồi sửa `src`:

```js
{ type: 'image', src: '/images/cua-toi.jpg',
  position: [-3, 2, -4.88], size: [1.4, 1.8], frame: 'bronze',
  title: 'Tên tranh', meta: 'Chất liệu · Niên đại', body: 'Mô tả...' }
```

Nếu chưa có file, app tự hiện tấm placeholder có tên — thay file là xong.

**Đặt mô hình .glb thật** (ví dụ tải trống đồng từ Sketchfab): bỏ file vào `public/models/`, rồi:

```js
{ type: 'model', model: '/models/trong-dong.glb',
  position: [0, 0, 0], scale: 1, pedestal: true, glassCase: true, light: true,
  title: 'Trống đồng', meta: '...', body: '...' }
```

`model` cũng nhận 3 mô hình dựng sẵn không cần file: `'trongdong'`, `'vase'`, `'plant'`.

**Thêm phòng:** thêm một mục vào mảng `rooms` (vị trí, kích thước, tường nào chừa cửa) và mở rộng `walkZones` để người xem đi sang được. Các vùng trong `walkZones` phải nối tiếp/chồng nhau qua ô cửa.

## Cấu trúc

```
src/
  museumData.js        ← cấu hình phòng + hiện vật + vùng đi lại (sửa ở đây)
  App.jsx              ← Canvas, màn hình vào, crosshair, bảng chú thích
  scene/
    Museum.jsx         ← ghép ánh sáng, phòng, hiện vật, hậu kỳ
    Room.jsx           ← sàn/trần/tường (tường có thể chừa cửa)
    Frame.jsx          ← tranh + khung + kính, click để xem
    Exhibit.jsx        ← mô hình + bệ + lồng kính + đèn rọi
    placeholders.jsx   ← trống đồng / bình gốm / cây dựng bằng code
    Player.jsx         ← điều khiển WASD + chuột + va chạm
  ui/InfoPanel.jsx     ← bảng chú thích
```

## Nâng cấp độ chân thật (gợi ý các bước tiếp)

- **Texture PBR thật** cho sàn/tường (đá hoa, gỗ): tải free ở ambientCG / Poly Haven, dùng `useTexture` của drei (map + normalMap + roughnessMap) thay cho màu đơn trong `Room.jsx`.
- **Bake ánh sáng trong Blender** rồi export `.glb` có lightmap — đây là bước cho ra ánh sáng mềm, chân thật nhất và nhẹ máy. Khi đó dựng phòng trong Blender thay vì bằng box.
- **HDRI thật**: đổi `<Environment>` Lightformer sang `<Environment files="/hdri/xxx.hdr" />` để phản chiếu thật hơn trên đồng và kính.
- **Va chạm chuẩn**: thay clamp theo hình chữ nhật bằng `three-mesh-bvh` để chặn theo hình học tường thật.
- **Nén model**: dùng Draco/meshopt cho file `.glb` lớn để tải nhanh.
- **Mobile**: PointerLock không chạy trên điện thoại — cần thêm joystick ảo + vuốt để xoay (ví dụ `nipplejs`).
- **Âm thanh**: nhạc nền + tiếng bước chân bằng `PositionalAudio` của drei.

## Tinh chỉnh nhanh

- Độ sáng tổng thể: `gl.toneMappingExposure` trong `App.jsx`, `ambientLight`/`Fixture` trong `Museum.jsx`.
- Đèn rọi hiện vật: `ExhibitLight` trong `Exhibit.jsx` (`intensity`, `angle`, `penumbra`).
- Hậu kỳ (AO, bloom, vignette): khối `<EffectComposer>` cuối `Museum.jsx`.
```
