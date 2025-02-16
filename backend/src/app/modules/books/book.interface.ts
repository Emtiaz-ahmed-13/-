export interface IBook {
  শিরোনাম: string;
  লেখক: string;
  মূল্য: number;
  ক্যাটাগরি:
    | 'উপন্যাস'
    | 'বিজ্ঞান'
    | 'প্রযুক্তি'
    | 'অন্যন্যা'
    | 'কবিতা'
    | 'গল্প';
  ছবি: string;
  প্রকাশনী: string;
  বিবরণ: string;
  পরিমাণ: number;
  স্টকে_আছে: boolean;
  তৈরি_হওয়ার_তারিখ?: Date;
  আপডেট_হওয়ার_তারিখ?: Date;
}
