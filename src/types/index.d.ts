export interface ExpandedProps {
  expanded: boolean;
  routes?: NavigationSection[];
  toggle?: () => void;
}

export interface NavigationSection {
  title: string;
  links: NavigationLink[];
}

export interface NavigationLink {
  name: string;
  path: string;
  icon: IconType;
}

export type Option = {
  id: string | boolean | undefined;
  name?: string | null;
};
