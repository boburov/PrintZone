import { create } from 'zustand';

type PaperType = 'A4' | 'A5';
type CoverType = 'soft' | 'hard';

interface PrintState {
  file: File | null;
  pageCount: number;
  copies: number;
  paperType: PaperType;
  coverType: CoverType;
  totalPrice: number;
  pricePerBook: number; // To store the calculated price for a single book
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
  pricePerBook: 0,
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

    if (pageCount === 0 || copies === 0) {
      set({ totalPrice: 0, pricePerBook: 0, isCalculated: true });
      return;
    }

    let coverPrice = 0;
    switch (coverType) {
      case 'hard':
        coverPrice = 25000;
        break;
      case 'soft':
        coverPrice = 5500;
        break;
    }

    let pagePrice = 0;
    if (coverType === 'soft') {
      if (paperType === 'A5') {
        pagePrice = 57;
      } else { // A4
        pagePrice = 110;
      }
    } else { // hard
      if (paperType === 'A5') {
        pagePrice = 70;
      } else { // A4
        pagePrice = 120;
      }
    }

    let singleBookPrice = (pageCount * pagePrice) + coverPrice;

    if (copies === 1) {
      singleBookPrice *= 3;
    } else if (copies <= 10) {
      singleBookPrice *= 2;
    } else if (copies <= 20) {
      singleBookPrice *= 1.3;
    }

    // Final 1.2 multiplier from the original script
    const finalSingleBookPrice = singleBookPrice * 1.2;
    const finalTotal = finalSingleBookPrice * copies;

    set({
      totalPrice: finalTotal,
      pricePerBook: finalSingleBookPrice,
      isCalculated: true,
    });
  },
  reset: () =>
    set({
      file: null,
      pageCount: 0,
      copies: 1,
      paperType: 'A4',
      coverType: 'soft',
      totalPrice: 0,
      pricePerBook: 0,
      fileName: '',
      isCalculated: false,
    }),
}));

export default useStore;
