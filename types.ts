
export type Gender = 'Nam' | 'Nữ' | 'Khác';

export enum Relationship {
  Grandparents = 'Ông bà',
  Parents = 'Cha mẹ',
  Teachers = 'Thầy cô',
  Friends = 'Bạn bè',
  Lovers = 'Người yêu',
  Colleagues = 'Đồng nghiệp',
  Bosses = 'Cấp trên',
  Customers = 'Khách hàng',
}

export enum Style {
  Traditional = 'Truyền thống',
  Formal = 'Trang trọng',
  Warm = 'Ấm áp gia đình',
  Youthful = 'Vui tươi, trẻ trung',
  Calligraphy = 'Thư pháp - Thi ca',
}

export interface UserInput {
  fullName: string;
  age: string;
  gender: Gender;
  relationship: Relationship;
  personality?: string;
  style: Style;
}

export interface GeneratedContent {
  greeting: string;
  imageUrl: string;
}

export type AppStep = 'INPUT' | 'GENERATING' | 'PREVIEW';
