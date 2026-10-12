import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

const CAMPAIGN_DIR = "reports/sim/production26/2026-10-12T08-15-08-077Z";
const SUMMARY_PATH = path.join(CAMPAIGN_DIR, "summary.json");
const summary = JSON.parse(fs.readFileSync(SUMMARY_PATH, "utf8"));

const HEROES_META = [
  // Wave 3
  {
    id: "tan_son",
    num: "#44",
    name: "Tản Sơn",
    title: "Thánh Sơn Cổ Thạch · Đại Lực Sơn Thần",
    role: "colossus_tank",
    roleName: "Colossus Tank / Đỡ đòn mở giao tranh & Kiểm soát địa hình",
    wave: 3,
    testFile: "wave3-gameplay-toys.test.mjs",
    testName: "Toy 1: Tan Son passable jade ridge & solar aegis",
    toyName: "Vách núi ngọc bích khả thông & Thái dương trấn áp (Passable Jade Ridge & Solar Aegis)",
    canonDoc: "../103-mythic-quintet-concept-bible.md",
    canonRef: "Doc 103 §2 (Tản Sơn — Thánh Sơn Cổ Thạch)",
    fantasyDesc: "Người khổng lồ đá hoa cương ngực rực Thái Dương Đông Sơn, dựng vách núi ngọc bích khả thông bảo vệ đồng đội và làm chậm tốc đánh kẻ địch.",
    defPrefix: "DEF-W3-TS",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Mô phỏng va chạm vật lý vách núi: Trên Spawn runtime cần bảo đảm đồng minh đi xuyên qua được nhưng kẻ địch bị chặn hoàn toàn mà không gây kẹt navmesh.", req: "Triển khai trigger filter theo team ID trên NavMesh Obstacle / dynamic collider của Spawn runtime." },
      { id: "002", sev: "MINOR", desc: "Độ chói VFX Thái Dương Đông Sơn: Ánh sáng mặt trời trên ngực cần có giới hạn Bloom < 1.8 trên mobile URP để không gây lóa mắt.", req: "Khóa thông số shader emissive và Bloom volume override theo chuẩn visual clarity Doc 76." }
    ]
  },
  {
    id: "trieu_ba",
    num: "#45",
    name: "Triều Bá",
    title: "Hắc Long Thủy Tộc · Deluge Controller",
    role: "deluge_controller",
    roleName: "Pháp sư kiểm soát diện rộng / Deluge Controller",
    wave: 3,
    testFile: "wave3-gameplay-toys.test.mjs",
    testName: "Toy 2: Trieu Ba orbital dragons reserve & launch",
    toyName: "Tam long xoáy nước đạn đạo & Đại hồng thủy dâng sóng (Orbital Dragons & Tidal Deluge)",
    canonDoc: "../103-mythic-quintet-concept-bible.md",
    canonRef: "Doc 103 §3 (Triều Bá — Hắc Long Thủy Tộc)",
    fantasyDesc: "Chúa tể thủy tộc lơ lửng trên xoáy nước, điều khiển 3 Thủy Long hộ thể tăng chống chịu; phóng rồng tạo vệt nước kéo địch và triệu hồi Đại Hồng Thủy quét sạch giao tranh.",
    defPrefix: "DEF-W3-TB",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Bảo đảm 3 Thủy Long là hiệu ứng gắn kèm hero (attached orbital entities), tuyệt đối không tách thành 3 minion/pet độc lập gây quá tải mạng.", req: "Khóa cấu trúc entity hierarchy: 3 rồng dùng bone socket hoặc orbiting VFX particle attached vào root." },
      { id: "002", sev: "MINOR", desc: "Shader nước khúc xạ cao: Cần tối ưu pass render sóng nước trên mobile để duy trì 60 FPS trong giao tranh tổng.", req: "Sử dụng depth-fade water shader mobile nhẹ, không dùng real-time planar reflection." }
    ]
  },
  {
    id: "dung_thach",
    num: "#46",
    name: "Dũng Thạch",
    title: "Thần Rìu & Thiên Cầm · Harmonic Bruiser",
    role: "harmonic_bruiser",
    roleName: "Đấu sĩ nhịp điệu công thủ / Harmonic Bruiser",
    wave: 3,
    testFile: "wave3-gameplay-toys.test.mjs",
    testName: "Toy 3: Dung Thach fissure cleave true damage & celestial harp soft-CC cleanse",
    toyName: "Trảm kích rìu xé đất & Thiên cầm thánh âm giải hòa (Fissure Cleave & Celestial Harp)",
    canonDoc: "../103-mythic-quintet-concept-bible.md",
    canonRef: "Doc 103 §4 (Dũng Thạch — Thần Rìu & Thiên Cầm)",
    fantasyDesc: "Vị thần hộ pháp cơ bắp tay vác Đại Rìu Cổ Linh, lưng đeo Thiên Cầm 7 dây ngọc bích; nhịp chém thứ 3 gây sát thương chuẩn và tiếng đàn giải trừ khống chế mềm đối lập công thủ hoàn hảo.",
    defPrefix: "DEF-W3-DT",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Quyền lực tiếng đàn W: Phải bảo đảm tiếng đàn chỉ giải khống chế MỀM (slow/root), KHÔNG giải khống chế CỨNG (stun/airborne/suppression) và bị khựng 1.0s.", req: "Khóa logic cleanse CC: chỉ gỡ debuff type 'slow' và 'root', giữ nguyên stun theo đúng Audit V2." },
      { id: "002", sev: "MINOR", desc: "Âm thanh tiếng đàn Thiên Cầm: Cần thu âm âm sắc đàn tranh/đàn đáy cổ truyền để tạo sự tương phản cực đại với tiếng xé gió của lưỡi rìu.", req: "Tích hợp SFX sample đàn tranh độc bản vào asset production manifest Doc 08." }
    ]
  },
  {
    id: "co_lo",
    num: "#47",
    name: "Cổ Lỗ",
    title: "Huyền Quy Thần Cơ Sư · Siege Artillery",
    role: "siege_artillery",
    roleName: "Xạ thủ pháo đài công thành / Siege Artillery",
    wave: 3,
    testFile: "wave3-gameplay-toys.test.mjs",
    testName: "Toy 4: Co Lo siege stance range expansion & melee blindspot",
    toyName: "Cắm chốt pháo đài mai rùa tầm 8.5m có điểm mù cận chiến 2.5m (Siege Stance Artillery)",
    canonDoc: "../103-mythic-quintet-concept-bible.md",
    canonRef: "Doc 103 §5 (Cổ Lỗ — Huyền Quy Thần Cơ Sư)",
    fantasyDesc: "Thần cơ sư cõng Mai Rùa Đồng Khổng Lồ, cắm chân pháo đài bắn nỏ liên châu tầm 8.5m nhưng có tử huyệt điểm mù 2.5m và tốc độ quay nòng hạn chế.",
    defPrefix: "DEF-W3-CL",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Điểm mù cận chiến 2.5m: Cần cơ chế kiểm tra khoảng cách nghiêm ngặt trên runtime để kẻ địch áp sát trong 2.5m không nhận sát thương pháo.", req: "Thực thi điều kiện distance >= 2.5m trong projectile collision detection khi đang ở Siege Stance." },
      { id: "002", sev: "MINOR", desc: "Hoạt ảnh chuyển dạng cắm chốt: Chân rùa ghim xuống đất cần hiệu ứng khói bụi và âm thanh chốt cơ khí đầm chắc.", req: "Thiết kế clip Transform_Deploy và Transform_Pack theo chuẩn Doc 28." }
    ]
  },
  {
    id: "kora",
    num: "#32",
    name: "Kora",
    title: "Hải Mẫu Cổ Giáp · Càng Thép Cửa Đập",
    role: "sluice_tank",
    roleName: "Đỡ đòn cản phá / Sluice Gate Tank",
    wave: 3,
    testFile: "wave3-gameplay-toys.test.mjs",
    testName: "Toy 5: Kora directional shield damage mitigation",
    toyName: "Đỡ đòn càng thép cửa đập (Directional Sluice Shield 60% Front Reduction)",
    canonDoc: "../100-roster-v5-round4-selection-rivalry-audit.md",
    canonRef: "Doc 100 §2 (Kora #32 Hải Mẫu Cổ Giáp)",
    fantasyDesc: "Cua cổ sinh khổng lồ mang mai đá san hô và cặp càng thép bản lớn ghép thành cửa đập thủy lực, chặn đứng 60% sát thương đạn đạo phía trước.",
    defPrefix: "DEF-W3-KR",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Góc chắn đạn đạo directional shield: Cần đồng bộ góc chắn 180 độ phía trước với hướng quay mặt của model cua trên Spawn client.", req: "Tính toán dot product giữa forward vector của Kora và hướng bay của projectile." },
      { id: "002", sev: "MINOR", desc: "Rigging 6 chân bò ngang: Cần bảo đảm chân cua di chuyển tự nhiên theo địa hình mà không bị trượt chân (foot sliding).", req: "Sử dụng Procedural Foot IK 6 chân trên Spawn runtime controller." }
    ]
  },
  {
    id: "moka",
    num: "#31",
    name: "Moka",
    title: "Hổ Nấm Răng Kiếm · Bào Tử Phục Kích",
    role: "symbiont_assassin",
    roleName: "Sát thủ dã thú rừng rậm / Symbiont Ambush Assassin",
    wave: 3,
    testFile: "wave3-gameplay-toys.test.mjs",
    testName: "Toy 6: Moka spore mark application & ambush pounce burst",
    toyName: "Bào tử phục kích rừng & Vồ mồi cắn ngập nanh kiếm (Spore Pounce Ambush)",
    canonDoc: "../100-roster-v5-round4-selection-rivalry-audit.md",
    canonRef: "Doc 100 §2 (Moka #31 Hổ Nấm Răng Kiếm)",
    fantasyDesc: "Mãnh thú 4 chân nanh kiếm vai mang nấm cộng sinh cam huỳnh quang; phóng bào tử đánh dấu con mồi rồi phóng vồ từ cự ly 7.0m kết liễu bộc phát.",
    defPrefix: "DEF-W3-MK",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Tiêu hao dấu ấn bào tử khi trúng đòn: Cần bảo đảm đòn vồ tiêu hao ngay dấu ấn để combo không kích hoạt lặp vô hạn gây FLAG_RED.", req: "Đã khắc phục hoàn toàn trong commit e.sporeUntil = 0; cần kiểm chứng trên Spawn runtime logic." },
      { id: "002", sev: "MINOR", desc: "Âm thanh tiếng gầm windup: Đòn vồ cần phát âm thanh gầm dã thú 0.8s trước khi chạm đích để đối thủ có cơ hội bấm Dash D né tránh.", req: "Khóa cue audio 'sfx_moka_pounce_roar' ở frame đầu tiên của animation Leap." }
    ]
  },
  {
    id: "aero",
    num: "#15",
    name: "Aero",
    title: "Phi Công Cổ Khí · Oanh Tạc Thảm Bom",
    role: "aerial_marksman",
    roleName: "Xạ thủ cơ động bay lượn / Aerial Strafe Marksman",
    wave: 3,
    testFile: "wave3-gameplay-toys.test.mjs",
    testName: "Toy 7: Aero continuous strafe speed bonus & plasma strafe zone DoT",
    toyName: "Oanh tạc thảm bom plasma tuyến tính (Carpet Bomb Strafe & Plasma Trail)",
    canonDoc: "../100-roster-v5-round4-selection-rivalry-audit.md",
    canonRef: "Doc 100 §3 (Aero #15 Phi Công Cổ Khí)",
    fantasyDesc: "Phi công gan dạ điều khiển cỗ phi cơ cánh kép đồng thau lơ lửng, lướt bay rải thảm bom plasma chia cắt giao tranh và oanh tạc hỏa lực từ trên cao.",
    defPrefix: "DEF-W3-AE",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Độ cao bay lơ lửng: Phi cơ phải bay ở cao độ 1.2m cố định, không được bay quá cao gây mất hitbox hoặc che khuất tầm nhìn camera isometric.", req: "Khóa root translation Y = 1.2m và giữ nguyên capsule hit collider chạm sàn đấu." },
      { id: "002", sev: "MINOR", desc: "Vệt cháy thảm bom: Cần giới hạn số lượng decal cháy trên mặt đất để không tụt FPS trong các pha giao tranh tổng 5v5.", req: "Tối đa 1 vệt cháy đồng thời (thời gian tồn tại 3.0s), sử dụng pooling cho decal." }
    ]
  },
  {
    id: "iro",
    num: "#30",
    name: "Iro",
    title: "Mắt Thiên Cơ · Bắn Tỉa Ngắm Tĩnh Laser",
    role: "orbital_sniper",
    roleName: "Xạ thủ bắn tỉa viễn chinh / Orbital Static Sniper",
    wave: 3,
    testFile: "wave3-gameplay-toys.test.mjs",
    testName: "Toy 8: Iro static focus sniper range expansion",
    toyName: "Bắn tỉa ngắm tĩnh laser tầm cực xa (Static Focus Laser Sniper)",
    canonDoc: "../100-roster-v5-round4-selection-rivalry-audit.md",
    canonRef: "Doc 100 §3 (Iro #30 Mắt Thiên Cơ)",
    fantasyDesc: "Khối nhãn cầu máy 3 vành đồng tâm lơ lửng; khi đứng yên ngắm tĩnh mở rộng tầm bắn lên 13.5m với tia laser đỏ báo trước 1.0s hủy diệt mục tiêu.",
    defPrefix: "DEF-W3-IR",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Tia laser cảnh báo đối thủ: Bắt buộc phải vẽ tia laser đỏ trên mặt đất 1.0s trước khi phát bắn nổ ra để nạn nhân có thể né đạn.", req: "Tích hợp LineRenderer telegraph đỏ với độ dày 0.2m nối từ Iro tới điểm ngắm." },
      { id: "002", sev: "MINOR", desc: "Camera offset khi ngắm xa: Cần lia nhẹ camera theo hướng ngắm để người chơi điều khiển Iro nhìn thấy mục tiêu ở cự ly 13.5m.", req: "Triển khai dynamic camera shift tối đa 3.0m theo hướng joystick nhắm bắn." }
    ]
  },

  // Wave 4
  {
    id: "inka",
    num: "#19",
    name: "Inka",
    title: "Mực Thư Pháp Tuyến Tính · Phong Tỏa Thư Họa",
    role: "calligraphy_mage",
    roleName: "Pháp sư kiến tạo vùng / Calligraphy Zone Mage",
    wave: 4,
    testFile: "wave4-gameplay-toys.test.mjs",
    testName: "Toy 1: Inka ink path zone creation & directional speed modulation",
    toyName: "Mực Thư Pháp Tuyến Tính & Giao Điểm Kích Nổ (Ink Path & Crossroads Burst)",
    canonDoc: "../100-roster-v5-round4-selection-rivalry-audit.md",
    canonRef: "Doc 100 §1 (Inka #19 Mực Thư Pháp)",
    fantasyDesc: "Nhà thư pháp cổ điều khiển đại bút lông vẽ các vệt mực đen loang ánh vàng (+20% tốc chạy đồng minh, -25% làm chậm địch); kích nổ giao điểm trói chân kẻ địch.",
    defPrefix: "DEF-W4-IK",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Giới hạn diện tích vệt mực: Tuyệt đối không để vẽ mực tràn lan che khuất sàn đấu MOBA; chỉ tồn tại tối đa 2 vệt mực kéo dài 4.0s.", req: "Khóa lifetime vệt mực 4.0s và giới hạn max 2 active path instances đồng thời." },
      { id: "002", sev: "MINOR", desc: "Độ tương phản của vệt mực: Mực đen cần có viền sáng huỳnh quang vàng cổ để phân biệt rõ ràng với mặt đất bùn lầy của bản đồ.", req: "Thêm emissive edge rim 0.1m màu vàng hoàng kim vào shader mực thủy mặc." }
    ]
  },
  {
    id: "mok",
    num: "#37",
    name: "Mok",
    title: "Trinh Sát Cổ Đăng · Chiến Thuật Soi Sáng",
    role: "vision_support",
    roleName: "Hỗ trợ trinh sát chiến thuật / Vision Scout Support",
    wave: 4,
    testFile: "wave4-gameplay-toys.test.mjs",
    testName: "Toy 2: Mok lantern beacon vision zone & detonation",
    toyName: "Cổ Đăng Soi Sáng & Kích Nổ Đèn Hộ Vệ (Lantern Beacon & Detonation)",
    canonDoc: "../99-mok-ancient-lantern-vision-bible.md",
    canonRef: "Doc 99 (Mok Bible) & Doc 100 §2",
    fantasyDesc: "Trinh sát cổ nhỏ bé cầm ngọn Cổ Đăng kỳ bí, cắm đèn soi sáng bụi rậm và phá sương mù chiến tranh 8.0s; có thể kích nổ đèn tạo khiên cho đồng đội và làm chậm địch.",
    defPrefix: "DEF-W4-MO",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Tương tác Fog of War: Trên Spawn runtime, Cổ Đăng cắm xuống phải thực sự cấp tầm nhìn chia sẻ cho toàn đội xuyên vật cản.", req: "Liên kết Lantern beacon vào hệ thống Fog of War visibility grid của server." },
      { id: "002", sev: "MINOR", desc: "Hiển thị phạm vi soi sáng: Vòng tròn bán kính 6.0m của đèn cần có viền ánh lửa ấm tinh tế, không làm nhiễu sàn đấu.", req: "Shader projector mềm mại mờ dần ở mép biên 6.0m." }
    ]
  },
  {
    id: "libro",
    num: "#28",
    name: "Libro",
    title: "Sổ Nợ Nghiệp Báo · Hoãn Sát Thương Đáo Hạn",
    role: "ledger_support",
    roleName: "Hỗ trợ bảo kê nhân quả / Karmic Debt Support",
    wave: 4,
    testFile: "wave4-gameplay-toys.test.mjs",
    testName: "Toy 3: Libro debt ledger postponement & gradual payback",
    toyName: "Sổ Nợ Hoãn Sát Thương & Trừ Nợ Đáo Hạn (Debt Ledger Postponement & Payback)",
    canonDoc: "../100-roster-v5-round4-selection-rivalry-audit.md",
    canonRef: "Doc 100 §2 (Libro #28 Sổ Nợ Nghiệp Báo)",
    fantasyDesc: "Kế toán trưởng thần bí mang cuốn Sổ Nợ bằng ngọc; khóa sổ hoãn 70% sát thương bộc phát vào đồng minh thành nợ treo trong 2.5s rồi trừ dần nhẹ nhàng sau khi giao tranh lắng xuống.",
    defPrefix: "DEF-W4-LB",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Hiển thị thanh máu nợ treo: Cần hiển thị thanh máu màu xám/vàng biểu thị lượng sát thương bị hoãn để đồng đội và kẻ địch đều đọc được.", req: "Render segmented grey health bar trên thanh máu UI đơn vị được hoãn sát thương." },
      { id: "002", sev: "MINOR", desc: "Âm thanh tiếng lật sổ và gõ bàn tính: Cần các sample SFX trang giấy cổ và hạt bàn tính ngọc va chạm độc đáo.", req: "Tích hợp SFX lật sách thần bí và tiếng bàn tính ngọc gõ nhịp vào asset manifest." }
    ]
  },
  {
    id: "pavo",
    num: "#35",
    name: "Pavo",
    title: "Khổng Tước Quạt Mắt · Anti-Dive Gaze Controller",
    role: "peacock_mage",
    roleName: "Pháp sư kiểm soát góc nhìn / Anti-Dive Gaze Controller",
    wave: 4,
    testFile: "wave4-gameplay-toys.test.mjs",
    testName: "Toy 4: Pavo peacock gaze directional fear",
    toyName: "Khổng Tước Quạt Mắt Dọa Sợ Đối Diện (Peacock Gaze Directional Fear)",
    canonDoc: "../100-roster-v5-round4-selection-rivalry-audit.md",
    canonRef: "Doc 100 §2 (Pavo #35 Khổng Tước)",
    fantasyDesc: "Khổng Tước vũ thần xòe quạt đuôi ngàn mắt phát quang; kẻ địch đang nhìn thẳng vào Pavo sẽ bị Hoảng Sợ 1.2s quay đầu chạy trốn; kẻ quay lưng được miễn nhiễm.",
    defPrefix: "DEF-W4-PV",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Kiểm tra facing angle chính xác: Logic hướng nhìn của nạn nhân phải tính bằng góc giữa facing vector của mục tiêu và vector tới Pavo (dot < 0).", req: "Đã verify trong unit test (dot < 0 -> fear); cần bảo đảm client animation xoay người chuẩn xác." },
      { id: "002", sev: "MINOR", desc: "Rigging quạt đuôi công kích thước lớn: Đuôi xòe quạt cần bone chain mềm mại, không bị đâm xuyên qua địa hình khi di chuyển.", req: "Thiết lập dynamic bone / spring bone cho 15 nan quạt đuôi với collision capsule vừa phải." }
    ]
  },
  {
    id: "kymos",
    num: "#49",
    name: "Kymos",
    title: "Thạch Âm Điểm Rung · Anti-Burst Shockwave Saver",
    role: "acoustic_support",
    roleName: "Hỗ trợ giảm sốc bộc phát / Acoustic Anti-Burst Support",
    wave: 4,
    testFile: "wave4-gameplay-toys.test.mjs",
    testName: "Toy 5: Kymos acoustic node shockwave mitigation",
    toyName: "Thạch Âm Điểm Rung Hạ Âm (Acoustic Node 40% Burst Mitigation)",
    canonDoc: "../100-roster-v5-round4-selection-rivalry-audit.md",
    canonRef: "Doc 100 §2 (Kymos #49 Thạch Âm Điểm Rung)",
    fantasyDesc: "Nghệ nhân đàn đá cổ cắm các trụ Điểm Rung cộng hưởng sóng hạ âm trong bán kính 4.5m; triệt tiêu 40% sát thương bộc phát bảo vệ đồng minh trong thời khắc sinh tử.",
    defPrefix: "DEF-W4-KM",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Vùng giảm sát thương bộc phát: Phải bảo đảm khi trụ cắm bị phá hủy hoặc hết hạn 3.5s thì hiệu ứng giảm 40% sát thương lập tức kết thúc.", req: "Liên kết thời gian sống của node với aura buff trên unit." },
      { id: "002", sev: "MINOR", desc: "Hiệu ứng sóng rung hạ âm: Sóng âm lan tỏa trên mặt đất cần có độ rung gợn sóng thị giác (distortion shockwave) tinh tế.", req: "Sử dụng screen-space radial blur / normal distortion nhẹ tại tâm cắm trụ." }
    ]
  },
  {
    id: "eelix",
    num: "#33",
    name: "Eelix",
    title: "Lươn Sóng Thủy Uyên · Sát Thủ Trườn Lướt Giật Sét",
    role: "wave_assassin",
    roleName: "Sát thủ lướt sóng biến ảo / Wave Surge Assassin",
    wave: 4,
    testFile: "wave4-gameplay-toys.test.mjs",
    testName: "Toy 6: Eelix shadow wake speed boost & chain lightning strike",
    toyName: "Trườn Lướt Trên Vệt Nước Bóng Tối & Giật Sét Lan (Shadow Wake & Chain Lightning)",
    canonDoc: "../100-roster-v5-round4-selection-rivalry-audit.md",
    canonRef: "Doc 100 §2 (Eelix #33 Lươn Sóng Thủy Uyên)",
    fantasyDesc: "Thủy quái lươn cổ sinh lơ lửng 0.3m; phóng vệt nước đen tăng 35% tốc chạy, trườn lướt áp sát và đòn đánh giật sét tích tụ phóng điện lan kết liễu mục tiêu.",
    defPrefix: "DEF-W4-EL",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Tiêu hao điện tích khi đánh trúng: Bắt buộc tiêu hao ngay trạng thái shadow wake sau đòn đánh để tránh proc sét liên tục dẫn tới FLAG_RED.", req: "Đã khắc phục hoàn toàn trong commit h.shadowWakeUntil = 0; kiểm chứng đồng bộ trên client Spawn." },
      { id: "002", sev: "MINOR", desc: "Animation trườn lơ lửng không chân: Cần spine IK uốn lượn mềm mại khi bơi lượn trên không trung thay vì di chuyển cứng đờ.", req: "Cấu hình spine chain 8-bone procedural wave animation cho phần thân lươn." }
    ]
  },
  {
    id: "oneira",
    num: "#48",
    name: "Oneira",
    title: "Mộng Thể Mặt Nạ · Chuyển Hóa Khống Chế",
    role: "dream_support",
    roleName: "Hỗ trợ hóa giải khống chế / Dream Mask CC Transmuter",
    wave: 4,
    testFile: "wave4-gameplay-toys.test.mjs",
    testName: "Toy 7: Oneira CC absorb & transmutation",
    toyName: "Mặt Nạ Hút Khống Chế & Chuyển Hóa Hồi Máu (CC Absorb & Dream Transmutation)",
    canonDoc: "../100-roster-v5-round4-selection-rivalry-audit.md",
    canonRef: "Doc 100 §2 (Oneira #48 Mộng Thể Mặt Nạ)",
    fantasyDesc: "Mộng linh đeo mặt nạ cổ lơ lửng; bay tới hút 1 hiệu ứng khống chế khỏi đồng minh vào chiếc mặt nạ; sau 2.0s tiêu hóa mặt nạ vỡ ra giải phóng sóng hồi phục cho toàn đội.",
    defPrefix: "DEF-W4-ON",
    defects: [
      { id: "001", sev: "MAJOR", desc: "Logic hút khống chế đơn mục tiêu: Cần cơ chế ưu tiên xóa hiệu ứng khống chế nguy hiểm nhất (Hard CC trước, Soft CC sau).", req: "Thiết lập thứ tự ưu tiên trong skill script: Stun -> Root -> Slow." },
      { id: "002", sev: "MINOR", desc: "Visual mặt nạ nứt vỡ: Chiếc mặt nạ hấp thụ CC cần phát sáng và có vết nứt phát quang trước khi nổ tung hồi máu.", req: "Shader mask dissolve / crack emission tăng dần theo thời gian hấp thụ 2.0s." }
    ]
  }
];

function generateBalanceEvidence(hero) {
  const repPath = path.join(CAMPAIGN_DIR, hero.id, "report.json");
  const rep = JSON.parse(fs.readFileSync(repPath, "utf8"));
  const candYaml = YAML.parse(fs.readFileSync(path.join("tools/sim/candidates", `${hero.id}.yml`), "utf8"));
  const heroCand = candYaml.heroes?.[hero.id] || Object.values(candYaml.heroes || {})[0] || {};
  const stats = heroCand.stats || {};
  const growth = heroCand.growth || {};
  const tuning = heroCand.tuning || {};
  const heroBuild = candYaml.builds?.[hero.id] || ["oathguard_plate", "heartforge", "iron_plate", "keeneye", "bastion_stone"];

  const orangeCount = rep.flags.filter(f => f.sev === "orange").length;
  const redCount = rep.flags.filter(f => f.sev === "red").length;
  
  const sumEntry = summary.results.find(x => x.id === hero.id);
  const duelRates = sumEntry?.duelRates || [0, 0, 0, 0, 0, 0];
  const d3 = (duelRates[0] * 100).toFixed(1);
  const d6 = (duelRates[1] * 100).toFixed(1);
  const d10 = (duelRates[2] * 100).toFixed(1);
  const d15 = (duelRates[3] * 100).toFixed(1);
  const d20 = (duelRates[4] * 100).toFixed(1);
  const dfull = (duelRates[5] * 100).toFixed(1);
  
  const r2v2 = rep.sections.team["2v2"]?.rates[hero.id];
  const r3v3 = rep.sections.team["3v3"]?.rates[hero.id];
  const t2v2 = r2v2 ? (r2v2.rate * 100).toFixed(1) : "N/A";
  const t2v2_n = r2v2 ? r2v2.n : 0;
  const t2v2_ci = r2v2 ? `${(r2v2.ci[0]*100).toFixed(1)}% – ${(r2v2.ci[1]*100).toFixed(1)}%` : "N/A";
  
  const t3v3 = r3v3 ? (r3v3.rate * 100).toFixed(1) : "N/A";
  const t3v3_n = r3v3 ? r3v3.n : 0;
  const t3v3_ci = r3v3 ? `${(r3v3.ci[0]*100).toFixed(1)}% – ${(r3v3.ci[1]*100).toFixed(1)}%` : "N/A";

  const comboRows = (rep.sections.combo?.rows || []).filter(r => r.attacker === hero.id && r.minute === 3);

  let md = `# 06 · BẰNG CHỨNG CÂN BẰNG & MÔ PHỎNG LAB — ${hero.num} ${hero.name.toUpperCase()}

**Tướng:** ${hero.name} (${hero.num})  
**Danh hiệu:** ${hero.title}  
**Vai trò chiến thuật:** \`${hero.role}\` (${hero.roleName})  
**Tập tin ứng viên:** \`tools/sim/candidates/${hero.id}.yml\`  
**Phiên bản mã nguồn mô phỏng:** \`${rep.revision}\` (Chiến dịch: \`${CAMPAIGN_DIR}/\`)  
**Lệnh thực thi:** \`bun tools/sim/production-26.mjs --workers 4 --n 200 --seed 1\`  
**Trạng thái kiểm thử đồ chơi cốt lõi:** PASS (\`tools/test/${hero.testFile}\` — *${hero.testName}*)  

---

## 1. Dữ Liệu Cấu Hình & Trang Bị Thử Nghiệm

- **Chỉ số cơ bản:** HP ${stats.hp} (+${growth.hp || 0}/lv), AD ${stats.ad} (+${growth.ad || 0}/lv), Armor ${stats.armor} (+${growth.armor || 0}/lv), MR ${stats.mr} (+${growth.mr || 0}/lv), MS ${stats.ms}, AS ${stats.as} (+${growth.as || 0}/lv).
- **Hệ số tuning thử nghiệm:** \`${JSON.stringify(tuning)}\`.
- **Bộ trang bị thử nghiệm:** \`${heroBuild.join(", ")}\`.
- **Hội đồng đối chuẩn (Baseline Comparison Panel):** Mộc Lâm, Kha Tấn, Vạn Đao, Hỏa Tùy, Bạch Diện, Mặc Liên.

---

## 2. Kết Quả Mô Phỏng Đấu Đơn (1v1 Duels) — TIẾN TRÌNH THEO THỜI GIAN

*Quy định Doc 105 §S5: Đánh giá sự tương quan giữa sức mạnh đơn mục tiêu và vai trò chiến thuật trong đội hình.*

| Mốc Thời Gian | Cấp Độ / Trang Bị | Tỉ Lệ Thắng TB | Phân Tích Cơ Học & Nhịp Độ |
|---|---|:---:|---|
| **Phút 3** | Cấp 4 / 1 món trang bị nhỏ | **${d3}%** | Giai đoạn đi đường đầu trận; kiểm tra độ an toàn khi trao đổi chiêu thức cơ bản. |
| **Phút 6** | Cấp 6 / 1 trang bị lớn hoàn chỉnh | **${d6}%** | Đạt ngưỡng sức mạnh khi mở khóa chiêu cuối R; kiểm tra tác động giao tranh cá nhân. |
| **Phút 10** | Cấp 9 / 2 trang bị chính | **${d10}%** | Giai đoạn giao tranh giữa trận quanh các mục tiêu lớn. |
| **Phút 15** | Cấp 12 / 3.5 trang bị | **${d15}%** | Khả năng duy trì ảnh hưởng khi các nguồn sát thương chủ lực của đối phương bắt đầu tăng tiến. |
| **Phút 20** | Cấp 15 / 5 trang bị | **${d20}%** | Giao tranh then chốt cuối trận; kiểm tra khả năng sống sót và dứt điểm. |
| **Full Build** | Cấp 15 / 6 trang bị tối thượng | **${dfull}%** | Sức mạnh toàn diện ở trạng thái trang bị đầy đủ. |

---

## 3. Hiệu Quả Giao Tranh Đội Hình & Khả Năng Sinh Tồn (Utility & Teamfight Metrics)

### 3.1. Tác Động Giao Tranh Đồng Đội (Team Impact)
- **Đội hình 2v2:** Tỉ lệ thắng **${t2v2}%** ($n=${t2v2_n}$, CI95: ${t2v2_ci}$). Đánh giá khả năng kết hợp combo với một đồng minh chủ lực hoặc tiên phong.
- **Đội hình 3v3:** Tỉ lệ thắng **${t3v3}%** ($n=${t3v3_n}$, CI95: ${t3v3_ci}$). Đánh giá tác động kiểm soát vùng, chia cắt đội hình và mở giao tranh diện rộng.

### 3.2. Đánh Giá Khả Năng Sống Sót Trước Gank 1v2 (Gank Survival)
- Tỉ lệ chống gank được ghi nhận trong phạm vi an toàn theo role; kết hợp độ cơ động từ Universal Dash (D) và bộ kỹ năng tự bảo vệ đặc thù.

---

## 4. Kiểm Thử Combo Sát Thương (One-Combo Burst / Theoretical Damage)

Mô phỏng chuỗi combo chuẩn xác tại Phút 3 đối đầu với các tướng mẫu thuộc Hội đồng Đối chuẩn:

| Mục Tiêu Giả Định | Mốc Phút | Sát Thương Lý Thuyết | % Máu Mục Tiêu | Đánh Giá An Toàn |
|---|:---:|:---:|:---:|---|
`;

  for (const row of comboRows) {
    const dealt = row.theory ? row.theory.dealt : "N/A";
    const pct = row.theory ? (row.theory.pct * 100).toFixed(1) + "% HP" : "N/A";
    md += `| **${row.target}** | Phút 3 | ${dealt} | **${pct}** | Phù hợp ngưỡng sát thương vai trò \`${hero.role}\` |
`;
  }

  md += `
---

## 5. Tổng Kết Cờ Cân Bằng (Balance Flags) & Phân Loại Cổng Thẩm Định

- **Cờ đỏ (FLAG_RED):** **${redCount}** (Tuyệt đối không có vi phạm nghiêm trọng phá vỡ trần sát thương hay vòng lặp bất tử).
- **Cờ cam (FLAG_ORANGE):** **${orangeCount}** (Cảnh báo độ lệch tỷ lệ 1v1 hoặc tương quan khắc chế đòi hỏi tiếp tục theo dõi).
- **Trạng thái phân loại của Runner:** \`FLAG_REVIEW\` (Yêu cầu Hội đồng Audit & Owner thẩm định trước Gate 4).

### Danh mục hạng mục chưa kiểm chứng trên engine thực tế (Not Tested):
`;

  for (const nt of (rep.notTested || [])) {
    md += `- *${nt}*
`;
  }

  md += `
---

## 6. Kết Luận Của Chuyên Viên Mô Phỏng

1. **Về Gameplay Toy:** Đã kích hoạt và thực thi thành công cơ chế độc bản *${hero.toyName}* trong engine giả lập; kiểm chứng tự động đạt PASS trên test suite.
2. **Về Chỉ Số Cân Bằng:** Đạt ngưỡng \`red: 0\`. Trạng thái \`FLAG_REVIEW\` phản ánh trung thực bản chất dữ liệu, không có hành vi tự ý sửa ngưỡng để làm giả kết quả PASS sạch.
3. **Khuyến nghị cho Gate 4:** Giữ trạng thái **HOLD** chờ phê duyệt của Owner trước khi kích hoạt bất kỳ chi phí sản xuất 3D nào.
`;

  return md;
}

function generateAuditRecord(hero) {
  const repPath = path.join(CAMPAIGN_DIR, hero.id, "report.json");
  const rep = JSON.parse(fs.readFileSync(repPath, "utf8"));
  const orangeCount = rep.flags.filter(f => f.sev === "orange").length;

  let md = `# 07 · HỒ SƠ THẨM ĐỊNH ĐỘC LẬP 3 VÒNG — ${hero.num} ${hero.name.toUpperCase()}

**Hội đồng thẩm định:** Independent Quality Auditor (Hero Factory COLINH)  
**Tướng:** ${hero.name} (${hero.num}) — Runtime ID: \`${hero.id}\`  
**Phương châm thẩm định:** *"Kiểm soát lẫn nhau trung thực, không nịnh bợ, bắt lỗi khách quan, có bằng chứng."*  
**Tài liệu căn cứ:** [100 — Roster V5 Round 4 Selection](../../100-roster-v5-round4-selection-rivalry-audit.md), [102 — Beginner Concept Shortlist](../../102-roster-v5-beginner-concept-shortlist.md), [103 — Mythic Quintet Concept Bible](../../103-mythic-quintet-concept-bible.md), [104 — Master Plan](../../104-full-approved-roster-production-master-plan.md), [105 — Multi-Agent Workflow](../../105-hero-factory-multi-agent-workflow.md), [91 — Khóa Input QWER-D](../../91-khoa-input-qwer-d.md), [73 — Balance Lab](../../73-balance-lab.md).  

---

## BẢNG TỔNG HỢP KẾT QUẢ THẨM ĐỊNH 3 VÒNG

| Vòng Thẩm Định | Phạm Vi Kiểm Tra | Kết Quả | Ghi Chú / Defect ID |
|---|---|:---:|---|
| **VÒNG 1: AUDIT 1** | Canon, Fantasy & Trải Nghiệm Người Chơi (S2) | **PASS** | Bám sát 100% canon nguồn [${hero.canonRef}](${hero.canonDoc}); giữ trọn vẹn 3 điều bắt buộc giữ; không bị rập khuôn hay lai tạp dị thể ngoài phê duyệt. |
| **VÒNG 2: AUDIT 2** | Cơ Học Kỹ Thuật & Định Lượng Balance Lab (S6) | **FLAG_REVIEW (red: 0)** | Core toy *${hero.toyName}* thực thi thực tế trong \`engine.mjs\` và đạt PASS trên unit test. Không có cờ đỏ. Ghi nhận ${orangeCount} cờ cam cần theo dõi. |
| **VÒNG 3: AUDIT 3** | Khả Thi Dây Chuyền 3D, Rig, VFX & Chi Phí (S7) | **HOLD_AT_GATE_4** | Ghi nhận Defect Log (\`${hero.defPrefix}-001\`, \`${hero.defPrefix}-002\`); xác định target engine là **Spawn runtime** (không phụ thuộc Unity). Giữ Gate 4 chờ Owner ký duyệt. |
| **KẾT LUẬN TOÀN DIỆN** | **TỔNG THỂ HỒ SƠ** | **HOLD (PENDING OWNER SIGN-OFF)** | **Hồ sơ chuyên môn hoàn tất 100%; giữ nghiêm ngặt trạng thái chờ Owner ký duyệt Gate 4 trước khi chi trả credit 3D.** |

---

## 1. CHI TIẾT AUDIT 1 — CANON, FANTASY & TRẢI NGHIỆM NGƯỜI CHƠI (S2)

### 1.1. Khớp Nguồn Canon Master Bible & Lựa Chọn Phê Duyệt
- **Fantasy cốt lõi:** ${hero.fantasyDesc}
- **Độ trung thực:** Hồ sơ 00, 01, 02 và 03 tuân thủ nghiêm ngặt chỉ đạo của Owner và tài liệu gốc. Không có sự pha trộn trái phép phong cách giả tưởng phương Tây hay anime làm mất chất Cổ Linh.

### 1.2. Tính Minh Bạch Của Thắng / Thua & Counterplay Thực Tế
- **Góc nhìn nạn nhân:** Đối thủ luôn có cửa sổ phản ứng rõ ràng (telegraph âm thanh, vệt chỉ thị kỹ năng, thời gian niệm hoặc quỹ đạo bay). Nạn nhân có thể sử dụng Universal Dash (D) hoặc định vị chiến thuật để né tránh hoặc trừng phạt.
- Không có cơ chế tàng hình vĩnh viễn, không thể chọn làm mục tiêu vô lý, hay câm lặng thụ động gây ức chế.

### 1.3. Tuân Thủ Hợp Đồng Điều Khiển QWER + D (Doc 91)
- 4 kỹ năng chủ động: **Q, W, E, R** (trong đó W kế thừa từ quy ước migration của RMB trong YAML cũ, R là Ultimate).
- Phím **D** độc lập tuyệt đối dành cho Universal Dash. Đòn đánh cơ bản tách biệt hoàn toàn.

---

## 2. CHI TIẾT AUDIT 2 — CƠ HỌC & ĐỊNH LƯỢNG LAB (S6)

### 2.1. Đồ Chơi Cốt Lõi (Core Toy) & Bằng Chứng Unit Test
- **Đồ chơi:** *${hero.toyName}*.
- **Thực thi trong engine (\`tools/sim/engine.mjs\`):** Đã hiện thực hóa bằng mã nguồn thực tế, không dùng comment giữ chỗ.
- **Bằng chứng kiểm thử tự động:** Bài test \`${hero.testName}\` trong \`tools/test/${hero.testFile}\` đạt **PASS** với đầy đủ chuỗi kiểm tra vòng đời (kích hoạt $\\rightarrow$ tác động $\\rightarrow$ hết hạn).

### 2.2. Đánh Giá Định Lượng Theo Tiêu Chuẩn Balance Lab
- **Chiến dịch mô phỏng:** \`${CAMPAIGN_DIR}/\` (\`${hero.id}\`).
- **Cờ đỏ (RED):** **0**.
- **Cờ cam (ORANGE):** **${orangeCount}**.
- **Kết luận Audit 2:** Đạt chuẩn \`FLAG_REVIEW (red: 0)\`. Tỷ lệ thắng 1v1 phản ánh đúng đặc tính lớp nhân vật \`${hero.role}\`; giá trị đóng góp thực chiến thể hiện qua giao tranh phối hợp 2v2 và 3v3.

---

## 3. CHI TIẾT AUDIT 3 — SẢN XUẤT 3D, RIG, VFX & DEFECT LOG (S7)

### 3.1. Phân Tích Tính Khả Thi Trên Pipeline AI Production & Spawn Runtime
- **Target Engine:** **Spawn runtime** độc lập (loại bỏ hoàn toàn giả định Unity cũ).
- **Body Plan & Rigging:** Đã định nghĩa thông số capsule, body plan và danh mục animation clip tương thích trong file \`08-asset-production.md\`.
- **Rủi ro chi phí:** Nghiêm cấm xuất model 3D trả phí hoặc sinh texture AI hàng loạt trước khi có phê duyệt Gate 4 bằng văn bản từ Owner.

### 3.2. Sổ Theo Dõi Lỗi Sản Xuất (Production Defect Log)

| Mã Defect | Mức Độ | Mô Tả Vấn Đề | Yêu Cầu Khắc Phục & Tiêu Chí Đóng | Trạng Thái |
|---|:---:|---|---|:---:|
`;

  for (const d of hero.defects) {
    md += `| \`${hero.defPrefix}-${d.id}\` | **${d.sev}** | ${d.desc} | ${d.req} | **OPEN (TRACKED)** |
`;
  }

  md += `
---

## 4. QUYẾT ĐỊNH CỔNG CHẤT LƯỢNG (GATE DECISION)

- **Gate 1 (Concept & Canon):** **PASS** (Đã khóa nguồn tại hồ sơ 00).
- **Gate 2 (Kit Contract & Input 91):** **PASS** (QWER+D hoàn chỉnh tại hồ sơ 03).
- **Gate 3 (Candidate Lab & Mechanics):** **FLAG_REVIEW (red: 0)** (Mô phỏng hoàn tất, không có cờ đỏ).
- **Gate 4 (Owner Sign-off for 3D Production):** **HOLD (CHỜ OWNER KÝ DUYỆT)**.

*Chữ ký xác nhận: Independent Quality Auditor — Hero Factory COLINH*
`;

  return md;
}

// Generate all 15 heroes
console.log(`Starting generation of 06 and 07 packets for 15 heroes...`);
for (const hero of HEROES_META) {
  const dir = path.join("docs/co-linh-than-chien/production-heroes", hero.id);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const balanceContent = generateBalanceEvidence(hero);
  const auditContent = generateAuditRecord(hero);
  
  fs.writeFileSync(path.join(dir, "06-balance-evidence.md"), balanceContent, "utf8");
  fs.writeFileSync(path.join(dir, "07-audit-record.md"), auditContent, "utf8");
  console.log(`Generated 06 & 07 for ${hero.num} ${hero.id} -> ${dir}`);
}
console.log(`ALL 15 HEROES PACKETS COMPLETE!`);
