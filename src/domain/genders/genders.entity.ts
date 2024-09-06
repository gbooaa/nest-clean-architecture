export interface GendersEntity {
  _id: string;
  name: string;
}

export interface GendersCreate {
  name: string;
}

export interface GendersEdit {
  name?: string;
}
