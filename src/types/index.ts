// ============================================
// Mutawif (Guide) Types
// ============================================

export interface Mutawif {
  id: string;
  name: string;
  rating: number;
  reviews?: number;
  languages: string[];
  photoUrl: string;
  avatarUrl?: string;
  vehicleUrl?: string;
  estimatedArrival?: string;
  distance?: string;
  isOfficial?: boolean;
}

// ============================================
// Booking Types
// ============================================

export interface Booking {
  id: string;
  quoteId?: string;
  date: string;
  startTime: string;
  duration: number;
  pax: number;
  serviceTitle: string;
  assignedTo: string;
  notes?: string;
  status: BookingStatus;
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum BookingType {
  SCHEDULED = 'Scheduled',
  NOW = 'Book Now',
}

// ============================================
// Payment Types
// ============================================

export enum PaymentMethod {
  FPX = 'FPX',
  CREDIT_CARD = 'CREDIT_CARD',
}

// ============================================
// Job Types (Partner/Guide)
// ============================================

export interface Job {
  id: string;
  title: string;
  time: string;
  location: string;
  statusTag: string;
  secondaryStatus?: string;
  imageUrl: string;
  pilgrims: number;
  isToday?: boolean;
}

export interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  amount: number;
  rating: number;
}

// ============================================
// Chat Types
// ============================================

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'mutawif';
  timestamp: Date;
}

// ============================================
// Cancellation Types
// ============================================

export enum CancellationReason {
  TOO_FAR = 'TOO_FAR',
  CHANGE_OF_PLANS = 'CHANGE_OF_PLANS',
  FOUND_ALTERNATIVE = 'FOUND_ALTERNATIVE',
  PRICE_ISSUE = 'PRICE_ISSUE',
  OTHER = 'OTHER',
}

export interface PolicyStep {
  id: string;
  title: string;
  badge: string;
  badgeType: 'success' | 'warning' | 'error';
  subtitle: string;
  description: string;
  icon: string;
  colorClass: string;
}

// ============================================
// Navigation Types
// ============================================

export enum Tab {
  HOME = 'Home',
  HISTORY = 'History',
  WALLET = 'Wallet',
  PROFILE = 'Profile',
}

export enum AppScreen {
  CANCELLATION = 'CANCELLATION',
  SEARCHING = 'SEARCHING',
  REFUND_CONFIRMED = 'REFUND_CONFIRMED',
}

export enum AppStatus {
  SEARCHING = 'SEARCHING',
  MATCHED = 'MATCHED',
}

// ============================================
// Location Types
// ============================================

export interface LocationPreference {
  hotelName?: string;
  pickupLocation?: string;
  preferredLanguages: string[];
  specialAssistance: string[];
}
