import { create } from 'zustand';

type PaperType = 'A4' | 'A5';
type CoverType = 'soft' | 'hard';

interface PrintState {
  files: (File | null)[];
  fileNames: string[];
  pageCounts: number[];
  copies: number[];
  paperType: PaperType;
  coverType: CoverType;
  totalPrice: number;
  isCalculated: boolean;
  bookCount: number;

  addFile: (file: File, pageCount: number) => void;
  addManualBook: (pageCount: number) => void;
  removeBook: (index: number) => void;
  setCopies: (index: number, copies: number) => void;
  setPaperType: (paperType: PaperType) => void;
  setCoverType: (coverType: CoverType) => void;
  calculateTotalPrice: () => void;
  reset: () => void;
}

const useStore = create<PrintState>((set, get) => ({
  files: [],
  fileNames: [],
  pageCounts: [],
  copies: [],
  paperType: 'A4',
  coverType: 'soft',
  totalPrice: 0,
  isCalculated: false,
  bookCount: 0,

  addFile: (file, pageCount) =>
    set((state) => ({
      files: [...state.files, file],
      fileNames: [...state.fileNames, file.name],
      pageCounts: [...state.pageCounts, pageCount],
      copies: [...state.copies, 1],
      bookCount: state.bookCount + 1,
      isCalculated: false,
    })),

  addManualBook: (pageCount) =>
    set((state) => ({
      files: [...state.files, null],
      fileNames: [...state.fileNames, `Manual Book ${state.bookCount + 1}`],
      pageCounts: [...state.pageCounts, pageCount],
      copies: [...state.copies, 1],
      bookCount: state.bookCount + 1,
      isCalculated: false,
    })),

  removeBook: (index) =>
    set((state) => {
      const newFiles = [...state.files];
      const newFileNames = [...state.fileNames];
      const newPageCounts = [...state.pageCounts];
      const newCopies = [...state.copies];

      newFiles.splice(index, 1);
      newFileNames.splice(index, 1);
      newPageCounts.splice(index, 1);
      newCopies.splice(index, 1);

      return {
        files: newFiles,
        fileNames: newFileNames,
        pageCounts: newPageCounts,
        copies: newCopies,
        bookCount: state.bookCount - 1,
        isCalculated: false,
      };
    }),

  setCopies: (index, newCopies) =>
    set((state) => {
      const newCopiesArray = [...state.copies];
      newCopiesArray[index] = newCopies;
      return { copies: newCopiesArray, isCalculated: false };
    }),

  setPaperType: (paperType) => set({ paperType, isCalculated: false }),
  setCoverType: (coverType) => set({ coverType, isCalculated: false }),

  calculateTotalPrice: () => {
    const { pageCounts, copies, paperType, coverType, bookCount } = get();

    if (bookCount === 0) {
      set({
        totalPrice: 0,
        isCalculated: true,
      });
      return;
    }

    let jild;
    switch (coverType) {
      case 'hard':
        jild = 25000;
        break;
      case 'soft':
        jild = 7500;
        break;
      default:
        jild = 7500;
    }

    let pricePerPageA4;
    let pricePerPageA5;

    const totalBooks = copies.reduce((acc, c) => acc + c, 0);

    if (totalBooks === 1) {
      pricePerPageA4 = 300;
      pricePerPageA5 = 150;
    } else if (totalBooks >= 2 && totalBooks <= 9) {
      pricePerPageA4 = 220;
      pricePerPageA5 = 110;
    } else if (totalBooks >= 10 && totalBooks <= 19) {
      pricePerPageA4 = 150;
      pricePerPageA5 = 75;
    } else if (totalBooks >= 20 && totalBooks <= 99) {
      pricePerPageA4 = 120;
      pricePerPageA5 = 55;
    } else { // 100+
      pricePerPageA4 = 110;
      pricePerPageA5 = 50;
    }

    const pricePerPage = paperType === 'A4' ? pricePerPageA4 : pricePerPageA5;

    const totalPrice = pageCounts.reduce((total, pageCount, index) => {
      const bookPrice = (pageCount * pricePerPage + jild) * copies[index];
      return total + bookPrice;
    }, 0);

    set({
      totalPrice: totalPrice,
      isCalculated: true,
    });
  },

  reset: () =>
    set({
      files: [],
      fileNames: [],
      pageCounts: [],
      copies: [],
      paperType: 'A4',
      coverType: 'soft',
      totalPrice: 0,
      isCalculated: false,
      bookCount: 0,
    }),
}));

export default useStore;