# 42 · Quản lý asset: manifest + luật khai báo

Ngày: 2026-10-08 · Trạng thái: **[USER LOCK]** (lukasai: "lập quy tắc tạo cấu trúc mềm manifest list toàn bộ assets (ảnh/3d/sound....) để dễ quản lý. Tải về chỉnh sửa local khi cần… khi dev game sinh ra thêm assets là phải khai báo"; "có tên. Link full tải về. Loại file. Danh mục index. Dễ quản lý").

## 1. Các file

| File | Ai viết | Nội dung |
|---|---|---|
| `assets/registry.yml` | **người / agent khai báo** | sổ khai báo: mỗi asset một dòng, khóa = địa chỉ (`/cdn/…` hoặc đường dẫn file world). Trường: `name`, `category`, `hero`, `source`, `note`, `declared`, `replaces` |
| `assets/manifest.yml` | sinh tự động | toàn bộ asset: `id`, `name`, `category`, `hero`, `type`, `origin`, `link` (tải đầy đủ), `bytes`, `status`, `usedBy`, `source` |
| `assets/manifest.csv` | sinh tự động | cùng dữ liệu, mở bằng Excel / Google Sheets để lọc, sắp xếp |
| `assets/INDEX.md` | sinh tự động | mục lục theo danh mục, mỗi asset một dòng với link **tải** |
| `assets/SOURCES.md` | sinh tự động | asset đang dùng → nguồn sửa (Blender / code) |
| `tools/assets/manifest.py` | công cụ | `build` · `check` · `declare` · `replace` · `prune` · `sources` |

Không sửa tay 4 file sinh tự động. Đổi tên, danh mục, ghi chú: sửa `registry.yml` rồi chạy `build`.

## 2. Luật (bắt buộc với mọi người và mọi agent dev game)

1. **Asset mới phải khai báo trong cùng lượt sinh ra nó**: ảnh vẽ, model Blender/upload, âm thanh, texture, clip animation, file code sinh hình (`scripts/gen`, `tex-`, `fx`), script Blender gốc (`art/`).
2. Khai báo = một dòng trong `assets/registry.yml` có **tên dễ đọc** (không để tên hash) và **danh mục hợp lệ** (bảng §3). Có nguồn gốc sửa được (file Blender, prompt) thì ghi `source`.
3. Trước khi báo xong một việc có asset: chạy `python3 tools/assets/manifest.py check`. Kết quả phải là `chưa khai báo 0 · danh mục sai 0`. Không đạt = việc chưa xong.
4. **Thay asset** (sửa local rồi upload lại): dùng `replace <cũ> <mới>`. Lệnh đổi mọi tham chiếu trong world, chuyển dòng registry sang địa chỉ mới, ghi `replaces: <cũ>` để truy ngược. Không sửa tay từng file.
5. Upload lên Spawn đặt tên file có nghĩa (`karst-wall-seg-a.glb`, không phải `model.glb`), theo mẫu `<loại>-<đối-tượng>-<biến-thể>-v<số>`.
6. Danh mục mới: thêm vào `CATS` trong `tools/assets/manifest.py` trước, rồi mới dùng.
7. **Không giữ rác** (lukasai 2026-10-10: "Tránh tạo rác assets… cái nào ko còn thực sự dùng nữa loại bỏ luôn"). Thay asset bằng bản mới = gỡ bản cũ ngay trong lượt đó (`replace`). Cuối mỗi lượt có asset: `manifest.py prune` (bỏ dòng sổ của asset không còn ai tham chiếu) → `check` phải `mồ côi 0`. Asset `chỉ trong tài liệu` (ảnh tham chiếu, model bản cũ trong TODO) **được giữ** (lukasai 2026-10-10: "tham chiếu cứ để lại"); prune không gỡ chúng.
8. Không sinh asset thử rồi bỏ đó: ảnh QA, proof, bản nháp Blender để trong `/workspace` (ngoài world), không upload, không vào repo. Upload chỉ khi game dùng thật.
9. **Kiểm kê nguồn sửa:** `assets/SOURCES.md` (sinh bởi `manifest.py sources`) liệt kê mọi model/clip/texture/code đang dùng → file Blender/code để sửa. Model/clip mới phải có `source` trong registry; `SOURCES.md` phải `thiếu nguồn 0`.
10. Không quét: `clips/` (bake tự sinh của engine, không phải asset của ta, không sửa tay) và `docs/**/legacy-*` (data game cũ, chỉ là chữ tham khảo).
11. CDN: Savi không có lệnh xoá file trên CDN. Asset gỡ khỏi code + sổ thì game không bao giờ tải nó nữa; xoá hẳn trên CDN là việc của đội Spawn nếu cần.

## 3. Danh mục (index)

| Mã | Nhãn |
|---|---|
| `model/hero` `model/minion` `model/creature` `model/boss` `model/environment` `model/prop` | Model 3D: tướng, lính, quái rừng/Minh Ước, boss, môi trường, đạo cụ |
| `anim/hero-skill` `anim/hero-death` `anim/minion` `anim/library` `anim/pose` | Animation: chiêu tướng, chết, lính, thư viện chung, track JSON |
| `audio/sfx` `audio/music` `audio/voice` | Âm thanh |
| `texture/terrain` `texture/surface` | Texture địa hình / bề mặt |
| `image/reference` `image/portrait` `image/ui` `image/qa` `image/other` | Ảnh: tham chiếu, chân dung, UI/icon, chụp QA |
| `code/geometry` `code/texture` `code/fx` `source/blender` | Asset dạng code và nguồn Blender |

## 4. Trạng thái

- `dùng trong game`: code, scene hoặc config đang tham chiếu.
- `chỉ trong tài liệu`: chỉ docs nhắc tới (tham chiếu, bản cũ).
- `không dùng`: đã upload nhưng không còn ai tham chiếu.
- `file trong world`: asset là file trong world (clip JSON, code, Blender), link dạng `world:<đường-dẫn>`.

## 5. Tải về sửa local

- Asset CDN: mở cột `link` (`https://www.spawn.co/cdn/…`) là tải được file gốc.
- Asset dạng file world (Blender, code, clip): tải qua repo của world bằng coding agent của bạn.
- Sửa xong: upload file mới → `python3 tools/assets/manifest.py replace /cdn/<cũ> /cdn/<mới>` → `check`.

## 6. Giới hạn hiện tại

- Quét theo tham chiếu tĩnh. Đường dẫn ghép động (`SFX('tên')`, `snd('tên')`, `A('clip')`, khóa `hit/death/step` trong lane.js) đã có luật quét riêng. Kiểu ghép mới phải thêm luật quét vào công cụ, nếu không asset đó sẽ không hiện.
- `bytes` chỉ có với asset upload. Âm thanh/texture sinh theo tên chưa có kích thước.
- Tên ban đầu (2026-10-08) do công cụ đặt từ tên upload hoặc chỗ dùng. Tên của 95 ảnh `chỉ trong tài liệu` còn dạng `<doc>-<hash>`, cần đặt lại dần.
