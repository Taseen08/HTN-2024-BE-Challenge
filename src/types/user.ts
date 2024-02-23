interface UserSkill {
  skill: string;
  rating: number;
}

export interface UserProfile {
  name: string;
  company: string;
  email: string;
  phone: string;
  skills: UserSkill[];
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  skills?: Array<{
    skill: string;
    rating: number;
  }>;
}
