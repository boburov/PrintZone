import { create } from 'zustand';
import { prices } from '../prices';

type PaperType = 'A4' | 'A5';
type CoverType = 'soft' | 'hard';

interface PrintState {
  file: File | null;
  pageCount: number;
  copies: number;
  paperType: PaperType;
  coverType: CoverType;
  totalPrice: number;
  fileName: string;
  isCalculated: boolean;
  setFile: (file: File | null) => void;
  setPageCount: (pageCount: number) => void;
  setCopies: (copies: number) => void;
  setPaperType: (paperType: PaperType) => void;
  setCoverType: (coverType: CoverType) => void;
  calculateTotalPrice: () => void;
  reset: () => void;
  setFileName: (fileName: string) => void;
}

const useStore = create<PrintState>((set, get) => ({
  file: null,
  pageCount: 0,
  copies: 1,
  paperType: 'A4',
  coverType: 'soft',
  totalPrice: 0,
  fileName: '',
  isCalculated: false,
  setFile: (file) => set({ file, isCalculated: false }),
  setPageCount: (pageCount) => set({ pageCount, isCalculated: false }),
  setCopies: (copies) => set({ copies, isCalculated: false }),
  setPaperType: (paperType) => set({ paperType, isCalculated: false }),
  setCoverType: (coverType) => set({ coverType, isCalculated: false }),
  setFileName: (fileName) => set({ fileName }),
  calculateTotalPrice: () => {
    const { pageCount, copies, paperType, coverType } = get();
    const pricePerPage = prices[paperType];
    const coverPrice = prices[coverType];
    const total = (pageCount * pricePerPage + coverPrice) * copies;
    set({ totalPrice: total, isCalculated: true });
  },
  reset: () =>
    set({
      file: null,
      pageCount: 0,
      copies: 1,
      paperType: 'A4',
      coverType: 'soft',
      totalPrice: 0,
      fileName: '',
      isCalculated: false,
    }),
}));

export default useStore;