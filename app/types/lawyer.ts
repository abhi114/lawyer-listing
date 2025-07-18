export interface Lawyer {
  id: string;
  name: string;
  specialization: string;
  photo: string;
  isOnline: boolean;
  experience: string;
  about: string;
  languages: Language[];
  rating?: number;
  reviewCount?: number;
  avatar?:string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

export interface LawyerProfileProps {
  lawyer: Lawyer;
  onStartChat: (lawyerId: string) => void;
  onGoBack: () => void;
}

export interface ProfileHeaderProps {
  lawyer: Lawyer;
  onGoBack: () => void;
}

export interface ProfileInfoProps {
  lawyer: Lawyer;
}

export interface LanguageListProps {
  languages: Language[];
}

export interface ActionButtonProps {
  onPress: () => void;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}