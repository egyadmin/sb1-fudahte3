export interface MenuItem {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  icon: string;
  features: {
    titleEn: string;
    titleAr: string;
    items: string[];
  };
  elements: {
    titleEn: string;
    titleAr: string;
    items: string[];
  };
}

export type Language = 'en' | 'ar';