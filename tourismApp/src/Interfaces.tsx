export interface PlaceInterface {
  owner: string;
  title: string;
  location: string;
  photos: string[];
  lastModified: string;
  description: string;
  maxGuests: number;
  price: number;
  rating: number;
}

export interface ReviewInterface {
  owner: string;
  placeId: string;
  reviewText: string;
  lastModified: string;
  rating: number;
}

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  profilePic: string;
}

export interface BookingInterface {
  owner: string;
  placeId: string;
  lastModified: string;
  selectedDate: string;
  guests: number;
  price: number;
  isCancelled: boolean;
}
