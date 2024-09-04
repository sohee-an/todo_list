export type fetchPostAssignmentReq = {
  // dayNumber: number;
  // title: string;
  description: string;
};

export type fetchAssignmentRes = {
  dayNumber: number;
  description: string;
  id: string;
  images: {
    createdAt: string;
    id: string;
    order: number;
    originName: string;
    path: string;
    type: number;
    updatedAt: string;
  }[];
};
