// Service categories
export const SERVICE_CATEGORIES = [
  { id: 'plumbing', name: 'Plumbing', icon: '🔧' },
  { id: 'electrical', name: 'Electrical', icon: '⚡' },
  { id: 'cleaning', name: 'Cleaning', icon: '🧹' },
  { id: 'aircon', name: 'Aircon Tech', icon: '❄️' },
  { id: 'carpentry', name: 'Carpentry', icon: '🪵' },
];

// Navigation routes
export const NAVIGATION_ROUTES = {
  HOME: 'Home',
  BOOKING: 'Booking',
  JOB_DETAILS: 'JobDetails',
  MY_JOBS: 'MyJobs',
  REVIEW: 'Review',
  PROFILE: 'Profile',
  AUTH: 'Auth',
  LOGIN: 'Login',
  REGISTER: 'Register',
};

// Booking time slots
export const TIME_SLOTS = [
  '08:00 AM - 12:00 PM',
  '12:00 PM - 4:00 PM',
  '4:00 PM - 8:00 PM',
];

// Error messages
export const ERROR_MESSAGES = {
  NO_INTERNET: 'We couldn\'t connect right now. Please try again in a moment.',
  AUTH_FAILED: 'Authentication failed. Please check your credentials.',
  BOOKING_FAILED: 'Failed to create booking. Please try again.',
  PAYMENT_FAILED: 'Payment processing failed. Please try again.',
  GENERIC: 'Something went wrong. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  BOOKING_CONFIRMED: 'Your booking has been confirmed!',
  REVIEW_SUBMITTED: 'Thank you for your review!',
  PROFILE_UPDATED: 'Your profile has been updated.',
};
