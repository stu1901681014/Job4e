export interface Rating {
  id: number;
  offerId: number;
  userId: number;
  score: number;
}

export interface RatingRequest {
  userId: number;
  offerId: number;
  score: number;
}

export interface RatingBaseResponse extends RatingRequest {
  id: number;
}
