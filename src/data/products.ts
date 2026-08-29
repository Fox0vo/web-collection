export type ProductSlug = "fold-lamp" | "grain-radio" | "trace-chair" | "ink-clock";

export type Product = {
  readonly slug: ProductSlug;
  readonly number: string;
  readonly category: string;
  readonly title: string;
  readonly subtitle: string;
  readonly deck: string;
  readonly year: string;
  readonly material: string;
  readonly maker: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
    readonly caption: string;
    readonly width: number;
    readonly height: number;
  };
  readonly tags: readonly string[];
  readonly story: readonly string[];
};

export const products = [
  {
    slug: "fold-lamp",
    number: "01",
    category: "照明 / LIGHT",
    title: "叠光灯",
    subtitle: "让一张纸，决定光落下的方式",
    deck: "一盏由折线、留白与暖光构成的桌灯。它不试图照亮整间房，只照顾正在阅读的人。",
    year: "2026",
    material: "阳极铝、和纸、黄铜",
    maker: "白井制作所",
    image: {
      src: "art/fold-lamp.svg",
      alt: "米白背景上，一盏黑色支架与赭红折纸灯罩构成的桌灯",
      caption: "叠光灯，侧面视图。折面把光线压低至桌面。",
      width: 1200,
      height: 900,
    },
    tags: ["阅读", "折纸结构", "低照度"],
    story: [
      "叠光灯从一个很小的问题开始：夜里读完一页书之后，房间是否必须仍然亮着？设计把光源藏进两片相向的折面，让光只在桌面形成一块安静的区域。",
      "支架没有多余的转轴。使用者通过移动整盏灯来改变光的位置，这个略显笨拙的动作，反而让物件与桌面建立了更明确的关系。",
      "灯罩可从黄铜卡槽中抽出替换。纸面留下纤维的方向与细小色差，因此每一盏灯在点亮时都稍有不同。",
    ],
  },
  {
    slug: "grain-radio",
    number: "02",
    category: "声音 / AUDIO",
    title: "粒波收音机",
    subtitle: "只保留一个旋钮的声音机器",
    deck: "橄榄绿的金属外壳、织物扬声器与一枚足够大的旋钮，把调频重新变成手上的动作。",
    year: "2025",
    material: "喷砂铝、亚麻织物、再生塑料",
    maker: "岛屿电器室",
    image: {
      src: "art/grain-radio.svg",
      alt: "灰白台面上的橄榄绿色方形收音机，正面有圆形织物扬声器与黑色旋钮",
      caption: "粒波收音机，正面视图。刻度沿旋钮外圈排列。",
      width: 1200,
      height: 900,
    },
    tags: ["收音", "单旋钮", "可维修"],
    story: [
      "粒波没有屏幕。频率刻度被直接刻在旋钮周围，指针行进时会发出轻微的机械摩擦声。寻找电台因此不是输入数字，而是一段需要停下来听的过程。",
      "织物网罩与外壳通过四枚内藏螺丝连接，拆开后，每个模块都有独立标记。电池、天线与扬声器都能单独更换。",
      "它的声音并不追求完全中性。木质桌面会让低频稍微变厚，而金属窗台会让人声更清楚；物件接受自己所在的房间。",
    ],
  },
  {
    slug: "trace-chair",
    number: "03",
    category: "坐具 / SEATING",
    title: "回线椅",
    subtitle: "一根钢管画出的坐姿",
    deck: "连续弯折的深蓝钢管托住一块薄木座面，线条在地面完成闭合，也留下移动时可握的空隙。",
    year: "2024",
    material: "粉末涂层钢、桦木夹板",
    maker: "折返点工作室",
    image: {
      src: "art/trace-chair.svg",
      alt: "浅灰背景上一把由深蓝连续钢管和木色薄座面组成的方正椅子",
      caption: "回线椅，四分之三视图。钢管在椅背与后腿之间连续转折。",
      width: 1200,
      height: 900,
    },
    tags: ["连续线", "轻量", "堆叠"],
    story: [
      "最初的草图只有一条没有离开纸面的线。制造时，这条线变成直径二十二毫米的钢管，经过六次弯折形成椅背、扶手与四条腿。",
      "座面保持平直，不用软垫修饰结构。前缘向下削薄，使膝后不会碰到硬边；背部的短横杆则只在身体后仰时提供支撑。",
      "四把椅子能够横向错位堆叠。收起时，蓝色钢管会组成一组密集的平行线，像是草图被重新放回同一张纸上。",
    ],
  },
  {
    slug: "ink-clock",
    number: "04",
    category: "时间 / TIME",
    title: "墨刻钟",
    subtitle: "没有数字，仍然读得懂的时间",
    deck: "哑黑表盘只保留十二道切口，米色指针在其上缓慢移动，让时间像印刷品一样清楚。",
    year: "2026",
    material: "铸铝、矿物玻璃、纸纤维",
    maker: "日常计时社",
    image: {
      src: "art/ink-clock.svg",
      alt: "赭色墙面上的方形黑色挂钟，表盘没有数字，只有米色指针与刻线",
      caption: "墨刻钟，壁挂状态。十二道切口取代了传统数字。",
      width: 1200,
      height: 900,
    },
    tags: ["静音", "无数字", "壁挂"],
    story: [
      "墨刻钟把表盘看作一页需要持续更新的印刷品。黑色不是装饰，而是让指针、切口与边⁠界同时变得明确的底色。",
      "秒针被取消，机芯也没有常见的滴答声。分钟的变化几乎无法被察觉，只有隔一段时间再次抬头，才会发现指针已经离开原处。",
      "背板由压制纸纤维制成，吸收机芯工作时极小的震动。整只钟可用一枚平头螺钉固定，拆卸时不需要专用工具。",
    ],
  },
] as const satisfies readonly Product[];
