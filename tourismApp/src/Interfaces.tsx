export interface PlaceInterface {
  _id: string;
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
  _id: string;
  owner: string;
  placeId: string;
  lastModified: string;
  selectedDate: string;
  guests: number;
  price: number;
  isCancelled: boolean;
}

export interface UserContextInterface {
  user: UserInterface | null,
  setUser: (user: UserInterface | null) => void,
  ready: boolean
}

export interface IsScrolledInterface {
  isScrolled: boolean,
  setIsScrolled: (isScrolled: boolean) => void,
}
