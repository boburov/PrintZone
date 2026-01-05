import { create } from 'zustand';

type PaperType = 'A4' | 'A5';
type CoverType = 'soft' | 'hard';

interface PrintState {
  file: File | null;
  fileName: string;
  pageCount: number;
  copies: number;
  paperType: PaperType;
  coverType: CoverType;
  totalPrice: number;
  pricePerBook: number;
  isCalculated: boolean;

  setFile: (file: File | null) => void;
  setFileName: (fileName: string) => void;
  setPageCount: (pageCount: number) => void;
  setCopies: (copies: number) => void;
  setPaperType: (paperType: PaperType) => void;
  setCoverType: (coverType: CoverType) => void;
  calculateTotalPrice: () => void;
  reset: () => void;
}

const useStore = create<PrintState>((set, get) => ({
  file: null,
  fileName: '',
  pageCount: 0,
  copies: 1,
  paperType: 'A4',
  coverType: 'soft',
  totalPrice: 0,
  pricePerBook: 0,
  isCalculated: false,

  setFile: (file) => set({ file, isCalculated: false }),
  setFileName: (fileName) => set({ fileName }),
  setPageCount: (pageCount) => set({ pageCount, isCalculated: false }),
  setCopies: (copies) => set({ copies, isCalculated: false }),
  setPaperType: (paperType) => set({ paperType, isCalculated: false }),
  setCoverType: (coverType) => set({ coverType, isCalculated: false }),

  calculateTotalPrice: () => {
    const { pageCount, copies, paperType, coverType } = get();

    if (pageCount <= 0 || copies <= 0) {
      set({
        totalPrice: 0,
        pricePerBook: 0,
        isCalculated: true,
      });
      return;
    }

    let jild: number;
    switch (coverType) {
      case "hard":
        jild = 25000;
        break;
      case "soft":
        jild = 5500;
        break;
      default:
        jild = 5500;
    }

    let qogozNarx: number;
    if (coverType === 'soft') {
      switch (paperType) {
        case 'A5':
          qogozNarx = 57;
          break;
        case 'A4':
          qogozNarx = 110;
          break;
        default:
          qogozNarx = 110;
      }
    } else { // hard cover
      switch (paperType) {
        case 'A5':
          qogozNarx = 70;
          break;
        case 'A4':
          qogozNarx = 120;
          break;
        default:
          qogozNarx = 120;
      }
    }

    let kitobPrice = pageCount * qogozNarx + jild;

    if (copies === 1) {
      kitobPrice *= 3;
    } else if (copies <= 10) {
      kitobPrice *= 2;
    } else if (copies <= 20) {
      kitobPrice *= 1.3;
    }

    const finalPricePerBook = kitobPrice * 1.2;
    const finalTotalPrice = finalPricePerBook * copies;

    set({
      pricePerBook: finalPricePerBook,
      totalPrice: finalTotalPrice,
      isCalculated: true,
    });
  },

  reset: () =>
    set({
      file: null,
      fileName: '',
      pageCount: 0,
      copies: 1,
      paperType: 'A4',
      coverType: 'soft',
      totalPrice: 0,
      pricePerBook: 0,
      isCalculated: false,
    }),
}));

export default useStore;