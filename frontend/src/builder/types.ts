export type BreakpointMode = 'desktop' | 'laptop' | 'tablet' | 'mobile';

export type ComponentCategory = 
  | 'layout' 
  | 'text' 
  | 'buttons' 
  | 'media' 
  | 'carousel' 
  | 'navigation' 
  | 'advanced' 
  | 'forms' 
  | 'data';

export interface ActionConfig {
  type: 'none' | 'url' | 'page' | 'modal' | 'scroll' | 'submit' | 'download';
  value?: string;
  target?: '_self' | '_blank';
}

export interface AnimationConfig {
  type: 'none' | 'fade' | 'slide-up' | 'zoom' | 'bounce' | 'flip';
  trigger: 'load' | 'scroll' | 'hover';
  duration: number;
  delay: number;
  easing?: string;
}

export interface CarouselSlide {
  id: string;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  buttonText?: string;
  buttonUrl?: string;
  bgColor?: string;
}

export interface ComponentNode {
  id: string;
  type: string;
  name: string;
  category: ComponentCategory;
  props: Record<string, any>;
  style: {
    desktop?: Record<string, any>;
    laptop?: Record<string, any>;
    tablet?: Record<string, any>;
    mobile?: Record<string, any>;
  };
  settings: {
    visible: boolean;
    locked: boolean;
    customClass?: string;
    customId?: string;
  };
  actions?: ActionConfig;
  animation?: AnimationConfig;
  children?: ComponentNode[];
}

export interface PageSeo {
  title: string;
  metaDescription: string;
  keywords?: string;
  ogImage?: string;
}

export interface PageSchema {
  id: string;
  title: string;
  slug: string;
  seo: PageSeo;
  status: 'draft' | 'published';
  rootNodes: ComponentNode[];
  createdAt: string;
  updatedAt: string;
}

export interface ComponentMeta {
  type: string;
  name: string;
  category: ComponentCategory;
  icon: string;
  description: string;
  defaultProps: Record<string, any>;
  defaultStyle: {
    desktop?: Record<string, any>;
    laptop?: Record<string, any>;
    tablet?: Record<string, any>;
    mobile?: Record<string, any>;
  };
  allowedChildren?: boolean | string[];
}

export interface NavLinkItem {
  id: string;
  label: string;
  href: string;
  isExternal?: boolean;
  active: boolean;
  order: number;
}

export interface FooterLinkItem {
  id: string;
  column: string;
  label: string;
  href: string;
}

