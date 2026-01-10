import { create } from 'zustand';

export type PaperType = 'A4' | 'A5';
export type CoverType = 'soft' | 'hard';

interface PrintState {
  files: (File | null)[];
  fileNames: string[];
  pageCounts: number[];
  copies: number[];
  bookPrices: number[];
  paperTypes: PaperType[];
  coverTypes: CoverType[];
  totalPrice: number;
  isCalculated: boolean;
  bookCount: number;

  addFile: (file: File, pageCount: number) => void;
  addManualBook: (pageCount: number) => void;
  removeBook: (index: number) => void;
  setCopies: (index: number, copies: number) => void;
  setPaperType: (index: number, paperType: PaperType) => void;
  setCoverType: (index: number, coverType: CoverType) => void;
  calculateTotalPrice: () => void;
  reset: () => void;
}

const useStore = create<PrintState>((set, get) => ({
  files: [],
  fileNames: [],
  pageCounts: [],
  copies: [],
  bookPrices: [],
  paperTypes: [],
  coverTypes: [],
  totalPrice: 0,
  isCalculated: false,
  bookCount: 0,

  addFile: (file, pageCount) =>
    set((state) => ({
      files: [...state.files, file],
      fileNames: [...state.fileNames, file.name],
      pageCounts: [...state.pageCounts, pageCount],
      copies: [...state.copies, 1],
      paperTypes: [...state.paperTypes, 'A4'],
      coverTypes: [...state.coverTypes, 'soft'],
      bookCount: state.bookCount + 1,
      isCalculated: false,
      bookPrices: [],
    })),

  addManualBook: (pageCount) =>
    set((state) => ({
      files: [...state.files, null],
      fileNames: [...state.fileNames, `Manual Book ${state.bookCount + 1}`],
      pageCounts: [...state.pageCounts, pageCount],
      copies: [...state.copies, 1],
      paperTypes: [...state.paperTypes, 'A4'],
      coverTypes: [...state.coverTypes, 'soft'],
      bookCount: state.bookCount + 1,
      isCalculated: false,
      bookPrices: [],
    })),

  removeBook: (index) =>
    set((state) => {
      const newFiles = [...state.files];
      const newFileNames = [...state.fileNames];
      const newPageCounts = [...state.pageCounts];
      const newCopies = [...state.copies];
      const newPaperTypes = [...state.paperTypes];
      const newCoverTypes = [...state.coverTypes];

      newFiles.splice(index, 1);
      newFileNames.splice(index, 1);
      newPageCounts.splice(index, 1);
      newCopies.splice(index, 1);
      newPaperTypes.splice(index, 1);
      newCoverTypes.splice(index, 1);

      return {
        files: newFiles,
        fileNames: newFileNames,
        pageCounts: newPageCounts,
        copies: newCopies,
        paperTypes: newPaperTypes,
        coverTypes: newCoverTypes,
        bookCount: state.bookCount - 1,
        isCalculated: false,
        bookPrices: [],
      };
    }),

  setCopies: (index, newCopies) =>
    set((state) => {
      const newCopiesArray = [...state.copies];
      newCopiesArray[index] = newCopies;
      return { copies: newCopiesArray, isCalculated: false, bookPrices: [] };
    }),

  setPaperType: (index, paperType) =>
    set((state) => {
      const newPaperTypes = [...state.paperTypes];
      newPaperTypes[index] = paperType;
      return { paperTypes: newPaperTypes, isCalculated: false, bookPrices: [] };
    }),

  setCoverType: (index, coverType) =>
    set((state) => {
      const newCoverTypes = [...state.coverTypes];
      newCoverTypes[index] = coverType;
      return { coverTypes: newCoverTypes, isCalculated: false, bookPrices: [] };
    }),

  calculateTotalPrice: () => {
    const { pageCounts, copies, paperTypes, coverTypes, bookCount } = get();

    if (bookCount === 0) {
      set({
        totalPrice: 0,
        bookPrices: [],
        isCalculated: true,
      });
      return;
    }

    const totalBooks = copies.reduce((acc, c) => acc + c, 0);

    let pricePerPageA4;
    let pricePerPageA5;

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

    const bookPrices = pageCounts.map((pageCount, index) => {
      const coverPrice = coverTypes[index] === 'hard' ? 25000 : 7500;
      const pricePerPage = paperTypes[index] === 'A4' ? pricePerPageA4 : pricePerPageA5;
      return (pageCount * pricePerPage + coverPrice) * copies[index];
    });

    const totalPrice = bookPrices.reduce((total, bookPrice) => total + bookPrice, 0);

    set({
      totalPrice: totalPrice,
      bookPrices: bookPrices,
      isCalculated: true,
    });
  },

  reset: () =>
    set({
      files: [],
      fileNames: [],
      pageCounts: [],
      copies: [],
      paperTypes: [],
      coverTypes: [],
      totalPrice: 0,
      isCalculated: false,
      bookCount: 0,
      bookPrices: [],
    }),
}));

export default useStore;