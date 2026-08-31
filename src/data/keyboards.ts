// allow: SIZE_OK — source-of-truth catalog table for 42 immutable local assets.
export type BrandSlug = "skn" | "mchose" | "epomaker" | "vgn";

export type KeyboardImage = {
  readonly asset: string;
  readonly alt: string;
  readonly caption: string;
  readonly variant?: string;
};

export type ColorVariant = {
  readonly slug: string;
  readonly name: string;
  readonly images: readonly [KeyboardImage, ...KeyboardImage[]];
};

export type KeyboardModel = {
  readonly slug: string;
  readonly brand: BrandSlug;
  readonly name: string;
  readonly summary: string;
  readonly colors: readonly [ColorVariant, ...ColorVariant[]];
};

export type Brand = {
  readonly slug: BrandSlug;
  readonly name: string;
  readonly models: readonly [KeyboardModel, ...KeyboardModel[]];
};

export const brands = [
  {
    slug: "mchose",
    name: "迈从 MCHOSE",
    models: [
      {
        slug: "mchose-g98-v3",
        brand: "mchose",
        name: "G98 V3",
        summary: "收录 4 组配色，共 4 张正面图。",
        colors: [
          {
            slug: "qingkonglan",
            name: "晴空蓝",
            images: [
              {
                asset: "mchose/g98-v3/qingkonglan.png",
                alt: "迈从 MCHOSE G98 V3 晴空蓝配色机械键盘正面",
                caption: "迈从 MCHOSE G98 V3，晴空蓝配色正面图。",
              },
            ],
          },
          {
            slug: "wutao-gradient",
            name: "雾桃渐变",
            images: [
              {
                asset: "mchose/g98-v3/wutao-gradient.png",
                alt: "迈从 MCHOSE G98 V3 雾桃渐变配色机械键盘正面",
                caption: "迈从 MCHOSE G98 V3，雾桃渐变配色正面图。",
              },
            ],
          },
          {
            slug: "yueyingbai",
            name: "月影白",
            images: [
              {
                asset: "mchose/g98-v3/yueyingbai.png",
                alt: "迈从 MCHOSE G98 V3 月影白配色机械键盘正面",
                caption: "迈从 MCHOSE G98 V3，月影白配色正面图。",
              },
            ],
          },
          {
            slug: "yuanshan-gradient",
            name: "远山渐变",
            images: [
              {
                asset: "mchose/g98-v3/yuanshan-gradient.png",
                alt: "迈从 MCHOSE G98 V3 远山渐变配色机械键盘正面",
                caption: "迈从 MCHOSE G98 V3，远山渐变配色正面图。",
              },
            ],
          },
        ],
      },
      {
        slug: "mchose-k99-v3",
        brand: "mchose",
        name: "K99 V3",
        summary: "收录 8 组配色，共 8 张正面图。",
        colors: [
          {
            slug: "xinghebai",
            name: "星核白",
            images: [
              {
                asset: "mchose/k99-v3/xinghebai.png",
                alt: "迈从 MCHOSE K99 V3 星核白配色机械键盘正面",
                caption: "迈从 MCHOSE K99 V3，星核白配色正面图。",
              },
            ],
          },
          {
            slug: "jinshabai",
            name: "金沙白",
            images: [
              {
                asset: "mchose/k99-v3/jinshabai.jpg",
                alt: "迈从 MCHOSE K99 V3 金沙白配色机械键盘正面",
                caption: "迈从 MCHOSE K99 V3，金沙白配色正面图。",
              },
            ],
          },
          {
            slug: "qingkonglan",
            name: "晴空蓝",
            images: [
              {
                asset: "mchose/k99-v3/qingkonglan.png",
                alt: "迈从 MCHOSE K99 V3 晴空蓝配色机械键盘正面",
                caption: "迈从 MCHOSE K99 V3，晴空蓝配色正面图。",
              },
            ],
          },
          {
            slug: "tianjicheng",
            name: "天际橙",
            images: [
              {
                asset: "mchose/k99-v3/tianjicheng.png",
                alt: "迈从 MCHOSE K99 V3 天际橙配色机械键盘正面",
                caption: "迈从 MCHOSE K99 V3，天际橙配色正面图。",
              },
            ],
          },
          {
            slug: "liujinhei",
            name: "鎏金黑",
            images: [
              {
                asset: "mchose/k99-v3/liujinhei.png",
                alt: "迈从 MCHOSE K99 V3 鎏金黑配色机械键盘正面",
                caption: "迈从 MCHOSE K99 V3，鎏金黑配色正面图。",
              },
            ],
          },
          {
            slug: "bingchuan-gradient",
            name: "冰川渐变",
            images: [
              {
                asset: "mchose/k99-v3/bingchuan-gradient.png",
                alt: "迈从 MCHOSE K99 V3 冰川渐变配色机械键盘正面",
                caption: "迈从 MCHOSE K99 V3，冰川渐变配色正面图。",
              },
            ],
          },
          {
            slug: "yuanshan-gradient",
            name: "远山渐变",
            images: [
              {
                asset: "mchose/k99-v3/yuanshan-gradient.png",
                alt: "迈从 MCHOSE K99 V3 远山渐变配色机械键盘正面",
                caption: "迈从 MCHOSE K99 V3，远山渐变配色正面图。",
              },
            ],
          },
          {
            slug: "wutao-gradient",
            name: "雾桃渐变",
            images: [
              {
                asset: "mchose/k99-v3/wutao-gradient.png",
                alt: "迈从 MCHOSE K99 V3 雾桃渐变配色机械键盘正面",
                caption: "迈从 MCHOSE K99 V3，雾桃渐变配色正面图。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "skn",
    name: "SKN",
    models: [
      {
        slug: "skn-qinglong-4",
        brand: "skn",
        name: "青龙4.0",
        summary: "收录 11 组配色，共 11 张正面图。",
        colors: [
          {
            slug: "yun",
            name: "云",
            images: [
              {
                asset: "skn/qinglong-4/yun.webp",
                alt: "SKN 青龙4.0 云配色机械键盘正面",
                caption: "SKN 青龙4.0，云配色正面图。",
              },
            ],
          },
          {
            slug: "dian",
            name: "电",
            images: [
              {
                asset: "skn/qinglong-4/dian.webp",
                alt: "SKN 青龙4.0 电配色机械键盘正面",
                caption: "SKN 青龙4.0，电配色正面图。",
              },
            ],
          },
          {
            slug: "lei",
            name: "雷",
            images: [
              {
                asset: "skn/qinglong-4/lei.webp",
                alt: "SKN 青龙4.0 雷配色机械键盘正面",
                caption: "SKN 青龙4.0，雷配色正面图。",
              },
            ],
          },
          {
            slug: "ultra-fei",
            name: "Ultra 绯",
            images: [
              {
                asset: "skn/qinglong-4/ultra-fei.jpg",
                alt: "SKN 青龙4.0 Ultra 绯配色机械键盘正面",
                caption: "SKN 青龙4.0，Ultra 绯配色正面图。",
              },
            ],
          },
          {
            slug: "ultra-ning",
            name: "Ultra 凝",
            images: [
              {
                asset: "skn/qinglong-4/ultra-ning.jpg",
                alt: "SKN 青龙4.0 Ultra 凝配色机械键盘正面",
                caption: "SKN 青龙4.0，Ultra 凝配色正面图。",
              },
            ],
          },
          {
            slug: "ultra-shao",
            name: "Ultra 韶",
            images: [
              {
                asset: "skn/qinglong-4/ultra-shao.jpg",
                alt: "SKN 青龙4.0 Ultra 韶配色机械键盘正面",
                caption: "SKN 青龙4.0，Ultra 韶配色正面图。",
              },
            ],
          },
          {
            slug: "ultra-yi",
            name: "Ultra 漪",
            images: [
              {
                asset: "skn/qinglong-4/ultra-yi.jpg",
                alt: "SKN 青龙4.0 Ultra 漪配色机械键盘正面",
                caption: "SKN 青龙4.0，Ultra 漪配色正面图。",
              },
            ],
          },
          {
            slug: "ultra-qingning",
            name: "Ultra 青柠",
            images: [
              {
                asset: "skn/qinglong-4/ultra-qingning.jpg",
                alt: "SKN 青龙4.0 Ultra 青柠配色机械键盘正面",
                caption: "SKN 青龙4.0，Ultra 青柠配色正面图。",
              },
            ],
          },
          {
            slug: "ultra-taoji",
            name: "Ultra 桃叽",
            images: [
              {
                asset: "skn/qinglong-4/ultra-taoji.jpg",
                alt: "SKN 青龙4.0 Ultra 桃叽配色机械键盘正面",
                caption: "SKN 青龙4.0，Ultra 桃叽配色正面图。",
              },
            ],
          },
          {
            slug: "yao",
            name: "曜",
            images: [
              {
                asset: "skn/qinglong-4/yao.jpg",
                alt: "SKN 青龙4.0 曜配色机械键盘正面",
                caption: "SKN 青龙4.0，曜配色正面图。",
              },
            ],
          },
          {
            slug: "yu",
            name: "雨",
            images: [
              {
                asset: "skn/qinglong-4/yu.jpg",
                alt: "SKN 青龙4.0 雨配色机械键盘正面",
                caption: "SKN 青龙4.0，雨配色正面图。",
              },
            ],
          },
        ],
      },
      {
        slug: "skn-qinglong-jingtan",
        brand: "skn",
        name: "青龙惊碳",
        summary: "收录 5 组配色，共 5 张正面图。",
        colors: [
          {
            slug: "heiwushi",
            name: "黑武士",
            images: [
              {
                asset: "skn/qinglong-jingtan/heiwushi.jpg",
                alt: "SKN 青龙惊碳 黑武士配色机械键盘正面",
                caption: "SKN 青龙惊碳，黑武士配色正面图。",
              },
            ],
          },
          {
            slug: "heilengtou",
            name: "黑棱透",
            images: [
              {
                asset: "skn/qinglong-jingtan/heilengtou.jpg",
                alt: "SKN 青龙惊碳 黑棱透配色机械键盘正面",
                caption: "SKN 青龙惊碳，黑棱透配色正面图。",
              },
            ],
          },
          {
            slug: "moyunxian-lishi",
            name: "墨云纤（历史款）",
            images: [
              {
                asset: "skn/qinglong-jingtan/moyunxian-lishi.jpg",
                alt: "SKN 青龙惊碳 墨云纤（历史款）配色机械键盘正面",
                caption: "SKN 青龙惊碳，墨云纤（历史款）配色正面图。",
              },
            ],
          },
          {
            slug: "youyinghei",
            name: "幽影黑",
            images: [
              {
                asset: "skn/qinglong-jingtan/youyinghei.jpg",
                alt: "SKN 青龙惊碳 幽影黑配色机械键盘正面",
                caption: "SKN 青龙惊碳，幽影黑配色正面图。",
              },
            ],
          },
          {
            slug: "fuyinghei",
            name: "浮影黑",
            images: [
              {
                asset: "skn/qinglong-jingtan/fuyinghei.jpg",
                alt: "SKN 青龙惊碳 浮影黑配色机械键盘正面",
                caption: "SKN 青龙惊碳，浮影黑配色正面图。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "vgn",
    name: "VGN",
    models: [
      {
        slug: "vgn-v108",
        brand: "vgn",
        name: "V108",
        summary: "收录 5 组配色，共 5 张正面图。",
        colors: [
          {
            slug: "shuimo-shanhe",
            name: "水墨山河",
            images: [
              {
                asset: "vgn/v108/shuimo-shanhe.jpg",
                alt: "VGN V108 水墨山河配色机械键盘正面",
                caption: "VGN V108，水墨山河配色正面图。",
              },
            ],
          },
          {
            slug: "yuanshan-qinlan",
            name: "远山沁蓝",
            images: [
              {
                asset: "vgn/v108/yuanshan-qinlan.jpg",
                alt: "VGN V108 远山沁蓝配色机械键盘正面",
                caption: "VGN V108，远山沁蓝配色正面图。",
              },
            ],
          },
          {
            slug: "chuxue-qingkong",
            name: "初雪晴空",
            images: [
              {
                asset: "vgn/v108/chuxue-qingkong.jpg",
                alt: "VGN V108 初雪晴空配色机械键盘正面",
                caption: "VGN V108，初雪晴空配色正面图。",
              },
            ],
          },
          {
            slug: "huajian-xinfeng",
            name: "花间信风",
            images: [
              {
                asset: "vgn/v108/huajian-xinfeng.jpg",
                alt: "VGN V108 花间信风配色机械键盘正面",
                caption: "VGN V108，花间信风配色正面图。",
              },
            ],
          },
          {
            slug: "shijian-yunji",
            name: "石间云迹",
            images: [
              {
                asset: "vgn/v108/shijian-yunji.jpg",
                alt: "VGN V108 石间云迹配色机械键盘正面",
                caption: "VGN V108，石间云迹配色正面图。",
              },
            ],
          },
        ],
      },
      {
        slug: "vgn-v98-pro-v4",
        brand: "vgn",
        name: "V98 Pro V4",
        summary: "收录 6 组配色，共 6 张正面图。",
        colors: [
          {
            slug: "yunjianbai",
            name: "云间白",
            images: [
              {
                asset: "vgn/v98-pro-v4/yunjianbai.jpg",
                alt: "VGN V98 Pro V4 云间白配色机械键盘正面",
                caption: "VGN V98 Pro V4，云间白配色正面图。",
              },
            ],
          },
          {
            slug: "haiyan",
            name: "海盐",
            images: [
              {
                asset: "vgn/v98-pro-v4/haiyan.jpg",
                alt: "VGN V98 Pro V4 海盐配色机械键盘正面",
                caption: "VGN V98 Pro V4，海盐配色正面图。",
              },
            ],
          },
          {
            slug: "shanhucheng",
            name: "珊瑚橙",
            images: [
              {
                asset: "vgn/v98-pro-v4/shanhucheng.jpg",
                alt: "VGN V98 Pro V4 珊瑚橙配色机械键盘正面",
                caption: "VGN V98 Pro V4，珊瑚橙配色正面图。",
              },
            ],
          },
          {
            slug: "zheyingbai",
            name: "折影白",
            images: [
              {
                asset: "vgn/v98-pro-v4/zheyingbai.jpg",
                alt: "VGN V98 Pro V4 折影白配色机械键盘正面",
                caption: "VGN V98 Pro V4，折影白配色正面图。",
              },
            ],
          },
          {
            slug: "anye",
            name: "暗夜",
            images: [
              {
                asset: "vgn/v98-pro-v4/anye.jpg",
                alt: "VGN V98 Pro V4 暗夜配色机械键盘正面",
                caption: "VGN V98 Pro V4，暗夜配色正面图。",
              },
            ],
          },
          {
            slug: "jidi-xianding",
            name: "极地限定",
            images: [
              {
                asset: "vgn/v98-pro-v4/jidi-xianding.jpg",
                alt: "VGN V98 Pro V4 极地限定配色机械键盘正面",
                caption: "VGN V98 Pro V4，极地限定配色正面图。",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "epomaker",
    name: "EPOMAKER",
    models: [
      {
        slug: "epomaker-galaxy100",
        brand: "epomaker",
        name: "Galaxy100",
        summary: "收录 3 组配色，共 3 张正面图。",
        colors: [
          {
            slug: "heise",
            name: "黑色",
            images: [
              {
                asset: "epomaker/galaxy100/heise.png",
                alt: "EPOMAKER Galaxy100 黑色配色机械键盘正面",
                caption: "EPOMAKER Galaxy100，黑色配色正面图。",
              },
            ],
          },
          {
            slug: "huise",
            name: "灰色",
            images: [
              {
                asset: "epomaker/galaxy100/huise.png",
                alt: "EPOMAKER Galaxy100 灰色配色机械键盘正面",
                caption: "EPOMAKER Galaxy100，灰色配色正面图。",
              },
            ],
          },
          {
            slug: "baizi",
            name: "白紫",
            images: [
              {
                asset: "epomaker/galaxy100/baizi.png",
                alt: "EPOMAKER Galaxy100 白紫配色机械键盘正面",
                caption: "EPOMAKER Galaxy100，白紫配色正面图。",
              },
            ],
          },
        ],
      },
    ],
  },
] as const satisfies readonly Brand[];

export const allModels: readonly KeyboardModel[] = brands.flatMap<KeyboardModel>((brand) => [...brand.models]);

export const brandCount = brands.length;
export const modelCount = allModels.length;
export const colorVariantCount = allModels.reduce((total, model) => total + model.colors.length, 0);
