import { create } from 'zustand';
import { BookingState, Provider } from '@/types';

interface BookingStore extends BookingState {
  setSelectedService: (service: string) => void;
  setSelectedProvider: (provider: Provider | null) => void;
  setPreferredTime: (time: string) => void;
  setDescription: (description: string) => void;
  setLocation: (location: string) => void;
  resetBooking: () => void;
}

const initialState: BookingState = {
  selectedService: null,
  selectedProvider: null,
  preferredTime: null,
  description: '',
  location: '',
};

export const useBookingStore = create<BookingStore>((set) => ({
  ...initialState,
  setSelectedService: (service) => set({ selectedService: service }),
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  setPreferredTime: (time) => set({ preferredTime: time }),
  setDescription: (description) => set({ description }),
  setLocation: (location) => set({ location }),
  resetBooking: () => set(initialState),
}));
