export interface Permission {
  id: string;
  name: string;
  description: string;
  type: string;
  links: Links;
}

export interface Links {
  self: string;
}
