export type SiteSettings = {
  name: string;
  description: string;
  phone: string;
  email: string;
  director: string;
};

export type SiteSettingsInput = SiteSettings;

export const defaultSiteSettings: SiteSettings = {
  name: "Загальноосвітня школа села Яські",
  description:
    "Ви зайшли на сайт Загальноосвітньої школи села Яські! Тут ви можете дізнатися про історію нашого закладу, ознайомитись із правилами прийому, а також побачити, які заходи проходять в нашій школі протягом року.",
  phone: "+38 (050) 336-02-71",
  email: "office@lyceum35.od.ukr.education",
  director: "Арват Віктор Миколайович",
};
