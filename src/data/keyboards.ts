// allow: SIZE_OK — source-of-truth catalog table for 41 immutable local assets.
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
    slug: "skn",
    name: "SKN",
    models: [
      {
        slug: "skn-qinglong-4",
        brand: "skn",
        name: "青龙4.0",
        summary: "收录 1 组配色，共 1 张正面图。",
        colors: [
          {
            slug: "yundianlei",
            name: "云电雷三配色",
            images: [
              {
                asset: "skn/qinglong-4/yundianlei.webp",
                alt: "SKN 青龙4.0 云电雷三配色机械键盘正面",
                caption: "SKN 青龙4.0，云电雷三配色正面图。",
              },
            ],
          },
        ],
      },
      {
        slug: "skn-qinglong-jingtan",
        brand: "skn",
        name: "青龙惊碳",
        summary: "收录 1 组配色，共 1 张正面图。",
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
        ],
      },
    ],
  },
  {
    slug: "mchose",
    name: "迈从 MCHOSE",
    models: [
      {
        slug: "mchose-g98-pro-v2",
        brand: "mchose",
        name: "G98 Pro V2",
        summary: "收录 7 组配色，共 14 张轴体版本正面图。",
        colors: [
          {
            slug: "bingchuan-gradient",
            name: "冰川渐变",
            images: [
              {
                asset: "mchose/g98-pro-v2/bingchuan-gradient__lieyancheng.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 冰川渐变配色烈焰橙轴机械键盘正面",
                caption: "冰川渐变 · 烈焰橙轴",
                variant: "烈焰橙轴",
              },
            ],
          },
          {
            slug: "chenglan",
            name: "橙蓝",
            images: [
              {
                asset: "mchose/g98-pro-v2/chenglan__xuehu.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 橙蓝配色雪虎轴机械键盘正面",
                caption: "橙蓝 · 雪虎轴",
                variant: "雪虎轴",
              },
              {
                asset: "mchose/g98-pro-v2/chenglan__lieyancheng.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 橙蓝配色烈焰橙轴机械键盘正面",
                caption: "橙蓝 · 烈焰橙轴",
                variant: "烈焰橙轴",
              },
            ],
          },
          {
            slug: "huilan",
            name: "灰蓝",
            images: [
              {
                asset: "mchose/g98-pro-v2/huilan__xuehu.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 灰蓝配色雪虎轴机械键盘正面",
                caption: "灰蓝 · 雪虎轴",
                variant: "雪虎轴",
              },
              {
                asset: "mchose/g98-pro-v2/huilan__lieyancheng.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 灰蓝配色烈焰橙轴机械键盘正面",
                caption: "灰蓝 · 烈焰橙轴",
                variant: "烈焰橙轴",
              },
            ],
          },
          {
            slug: "lanse",
            name: "蓝色",
            images: [
              {
                asset: "mchose/g98-pro-v2/lanse__xuehu.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 蓝色配色雪虎轴机械键盘正面",
                caption: "蓝色 · 雪虎轴",
                variant: "雪虎轴",
              },
              {
                asset: "mchose/g98-pro-v2/lanse__lieyancheng.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 蓝色配色烈焰橙轴机械键盘正面",
                caption: "蓝色 · 烈焰橙轴",
                variant: "烈焰橙轴",
              },
            ],
          },
          {
            slug: "jiyehei",
            name: "极夜黑",
            images: [
              {
                asset: "mchose/g98-pro-v2/jiyehei__baicaidoufu-v2.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 极夜黑配色白菜豆腐轴V2机械键盘正面",
                caption: "极夜黑 · 白菜豆腐轴V2",
                variant: "白菜豆腐轴V2",
              },
              {
                asset: "mchose/g98-pro-v2/jiyehei__lieyancheng.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 极夜黑配色烈焰橙轴机械键盘正面",
                caption: "极夜黑 · 烈焰橙轴",
                variant: "烈焰橙轴",
              },
            ],
          },
          {
            slug: "heimeifen",
            name: "黑莓粉",
            images: [
              {
                asset: "mchose/g98-pro-v2/heimeifen__xuehu.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 黑莓粉配色雪虎轴机械键盘正面",
                caption: "黑莓粉 · 雪虎轴",
                variant: "雪虎轴",
              },
              {
                asset: "mchose/g98-pro-v2/heimeifen__baicaidoufu-v2.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 黑莓粉配色白菜豆腐轴V2机械键盘正面",
                caption: "黑莓粉 · 白菜豆腐轴V2",
                variant: "白菜豆腐轴V2",
              },
              {
                asset: "mchose/g98-pro-v2/heimeifen__lieyancheng.jpg",
                alt: "迈从 MCHOSE G98 Pro V2 黑莓粉配色烈焰橙轴机械键盘正面",
                caption: "黑莓粉 · 烈焰橙轴",
                variant: "烈焰橙轴",
              },
            ],
          },
          {
            slug: "heizi",
            name: "黑紫",
            images: [
              {
                asset: "mchose/g98-pro-v2/heizi__baicaidoufu-v2.png",
                alt: "迈从 MCHOSE G98 Pro V2 黑紫配色白菜豆腐轴V2机械键盘正面",
                caption: "黑紫 · 白菜豆腐轴V2",
                variant: "白菜豆腐轴V2",
              },
              {
                asset: "mchose/g98-pro-v2/heizi__lieyancheng.png",
                alt: "迈从 MCHOSE G98 Pro V2 黑紫配色烈焰橙轴机械键盘正面",
                caption: "黑紫 · 烈焰橙轴",
                variant: "烈焰橙轴",
              },
            ],
          },
        ],
      },
      {
        slug: "mchose-g98-v3",
        brand: "mchose",
        name: "G98 V3",
        summary: "收录 4 组配色，共 5 张轴体版本正面图。",
        colors: [
          {
            slug: "qingkonglan",
            name: "晴空蓝",
            images: [
              {
                asset: "mchose/g98-v3/qingkonglan__binglan.png",
                alt: "迈从 MCHOSE G98 V3 晴空蓝配色冰蓝轴机械键盘正面",
                caption: "晴空蓝 · 冰蓝轴",
                variant: "冰蓝轴",
              },
              {
                asset: "mchose/g98-v3/qingkonglan__kuaijin.png",
                alt: "迈从 MCHOSE G98 V3 晴空蓝配色快金轴机械键盘正面",
                caption: "晴空蓝 · 快金轴",
                variant: "快金轴",
              },
            ],
          },
          {
            slug: "wutao-gradient",
            name: "雾桃渐变",
            images: [
              {
                asset: "mchose/g98-v3/wutao-gradient__kuaijin.png",
                alt: "迈从 MCHOSE G98 V3 雾桃渐变配色快金轴机械键盘正面",
                caption: "雾桃渐变 · 快金轴",
                variant: "快金轴",
              },
            ],
          },
          {
            slug: "yueyingbai",
            name: "月影白",
            images: [
              {
                asset: "mchose/g98-v3/yueyingbai__huaban.png",
                alt: "迈从 MCHOSE G98 V3 月影白配色花瓣轴机械键盘正面",
                caption: "月影白 · 花瓣轴",
                variant: "花瓣轴",
              },
            ],
          },
          {
            slug: "yuanshan-gradient",
            name: "远山渐变",
            images: [
              {
                asset: "mchose/g98-v3/yuanshan-gradient__binglan.png",
                alt: "迈从 MCHOSE G98 V3 远山渐变配色冰蓝轴机械键盘正面",
                caption: "远山渐变 · 冰蓝轴",
                variant: "冰蓝轴",
              },
            ],
          },
        ],
      },
      {
        slug: "mchose-k99-v3",
        brand: "mchose",
        name: "K99 V3",
        summary: "收录 6 组配色，共 12 张正面图。",
        colors: [
          {
            slug: "xinxingbai",
            name: "新星白",
            images: [
              {
                asset: "mchose/k99-v3/xinxingbai__official.jpg",
                alt: "迈从 MCHOSE K99 V3 新星白配色官方产品图机械键盘正面",
                caption: "新星白 · 官方产品图",
                variant: "官方产品图",
              },
              {
                asset: "mchose/k99-v3/xinxingbai__bingju.jpg",
                alt: "迈从 MCHOSE K99 V3 新星白配色冰橘轴机械键盘正面",
                caption: "新星白 · 冰橘轴",
                variant: "冰橘轴",
              },
            ],
          },
          {
            slug: "tiankonglan",
            name: "天空蓝",
            images: [
              {
                asset: "mchose/k99-v3/tiankonglan__official.jpg",
                alt: "迈从 MCHOSE K99 V3 天空蓝配色官方产品图机械键盘正面",
                caption: "天空蓝 · 官方产品图",
                variant: "官方产品图",
              },
              {
                asset: "mchose/k99-v3/tiankonglan__bingju.jpg",
                alt: "迈从 MCHOSE K99 V3 天空蓝配色冰橘轴机械键盘正面",
                caption: "天空蓝 · 冰橘轴",
                variant: "冰橘轴",
              },
            ],
          },
          {
            slug: "shanluan-gradient",
            name: "山峦渐变",
            images: [
              {
                asset: "mchose/k99-v3/shanluan-gradient__official.jpg",
                alt: "迈从 MCHOSE K99 V3 山峦渐变配色官方产品图机械键盘正面",
                caption: "山峦渐变 · 官方产品图",
                variant: "官方产品图",
              },
              {
                asset: "mchose/k99-v3/shanluan-gradient__bingju.jpg",
                alt: "迈从 MCHOSE K99 V3 山峦渐变配色冰橘轴机械键盘正面",
                caption: "山峦渐变 · 冰橘轴",
                variant: "冰橘轴",
              },
            ],
          },
          {
            slug: "dipingxiancheng",
            name: "地平线橙",
            images: [
              {
                asset: "mchose/k99-v3/dipingxiancheng__official.jpg",
                alt: "迈从 MCHOSE K99 V3 地平线橙配色官方产品图机械键盘正面",
                caption: "地平线橙 · 官方产品图",
                variant: "官方产品图",
              },
              {
                asset: "mchose/k99-v3/dipingxiancheng__bingju.jpg",
                alt: "迈从 MCHOSE K99 V3 地平线橙配色冰橘轴机械键盘正面",
                caption: "地平线橙 · 冰橘轴",
                variant: "冰橘轴",
              },
            ],
          },
          {
            slug: "heijin",
            name: "黑金",
            images: [
              {
                asset: "mchose/k99-v3/heijin__official.jpg",
                alt: "迈从 MCHOSE K99 V3 黑金配色官方产品图机械键盘正面",
                caption: "黑金 · 官方产品图",
                variant: "官方产品图",
              },
              {
                asset: "mchose/k99-v3/heijin__bingju.jpg",
                alt: "迈从 MCHOSE K99 V3 黑金配色冰橘轴机械键盘正面",
                caption: "黑金 · 冰橘轴",
                variant: "冰橘轴",
              },
            ],
          },
          {
            slug: "fense-gradient",
            name: "粉色渐变",
            images: [
              {
                asset: "mchose/k99-v3/fense-gradient__official.jpg",
                alt: "迈从 MCHOSE K99 V3 粉色渐变配色官方产品图机械键盘正面",
                caption: "粉色渐变 · 官方产品图",
                variant: "官方产品图",
              },
              {
                asset: "mchose/k99-v3/fense-gradient__bingju.jpg",
                alt: "迈从 MCHOSE K99 V3 粉色渐变配色冰橘轴机械键盘正面",
                caption: "粉色渐变 · 冰橘轴",
                variant: "冰橘轴",
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
            slug: "black-rgb",
            name: "黑色 RGB",
            images: [
              {
                asset: "epomaker/galaxy100/black-rgb.png",
                alt: "EPOMAKER Galaxy100 黑色 RGB 配色机械键盘正面",
                caption: "EPOMAKER Galaxy100，黑色 RGB 配色正面图。",
              },
            ],
          },
          {
            slug: "beige",
            name: "米色",
            images: [
              {
                asset: "epomaker/galaxy100/beige.png",
                alt: "EPOMAKER Galaxy100 米色配色机械键盘正面",
                caption: "EPOMAKER Galaxy100，米色配色正面图。",
              },
            ],
          },
          {
            slug: "white-purple",
            name: "白紫",
            images: [
              {
                asset: "epomaker/galaxy100/white-purple.png",
                alt: "EPOMAKER Galaxy100 白紫配色机械键盘正面",
                caption: "EPOMAKER Galaxy100，白紫配色正面图。",
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
            slug: "qinglv-accent",
            name: "青绿点缀",
            images: [
              {
                asset: "vgn/v108/qinglv-accent.jpg",
                alt: "VGN V108 青绿点缀配色机械键盘正面",
                caption: "VGN V108，青绿点缀配色正面图。",
              },
            ],
          },
          {
            slug: "qianlan",
            name: "浅蓝",
            images: [
              {
                asset: "vgn/v108/qianlan.jpg",
                alt: "VGN V108 浅蓝配色机械键盘正面",
                caption: "VGN V108，浅蓝配色正面图。",
              },
            ],
          },
          {
            slug: "heibai",
            name: "黑白",
            images: [
              {
                asset: "vgn/v108/heibai.jpg",
                alt: "VGN V108 黑白配色机械键盘正面",
                caption: "VGN V108，黑白配色正面图。",
              },
            ],
          },
          {
            slug: "shenlan",
            name: "深蓝",
            images: [
              {
                asset: "vgn/v108/shenlan.jpg",
                alt: "VGN V108 深蓝配色机械键盘正面",
                caption: "VGN V108，深蓝配色正面图。",
              },
            ],
          },
          {
            slug: "fenlv",
            name: "粉绿",
            images: [
              {
                asset: "vgn/v108/fenlv.jpg",
                alt: "VGN V108 粉绿配色机械键盘正面",
                caption: "VGN V108，粉绿配色正面图。",
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
