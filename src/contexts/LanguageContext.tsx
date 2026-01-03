import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ta' | 'en';

interface Translations {
  [key: string]: {
    ta: string;
    en: string;
  };
}

const translations: Translations = {
  // App Header
  appName: { ta: 'BJP கோயம்புத்தூர்', en: 'BJP Coimbatore' },
  
  // Navigation
  booth: { ta: 'பூத்', en: 'Booth' },
  street: { ta: 'தெரு', en: 'Street' },
  page: { ta: 'பக்கம்', en: 'Page' },
  door: { ta: 'கதவு', en: 'Door' },
  voter: { ta: 'வாக்காளர்', en: 'Voter' },
  
  // Dashboard
  myBooth: { ta: 'என் பூத்', en: 'My Booth' },
  boothMapView: { ta: 'பூத் வரைபடம்', en: 'Booth Map View' },
  boothNumber: { ta: 'பூத் எண்', en: 'Booth Number' },
  boothType: { ta: 'பூத் வகை', en: 'Booth Type' },
  boothDomain: { ta: 'பூத் பகுதி', en: 'Booth Domain' },
  boothIndex: { ta: 'பூத் குறியீடு', en: 'Booth Index' },
  
  // Stats
  membersVsVoters: { ta: 'உறுப்பினர் vs வாக்காளர்கள்', en: 'Members Vs Voters' },
  memberPercentage: { ta: 'உறுப்பினர் சதவீதம்', en: 'Member Percentage' },
  totalVoters: { ta: 'மொத்த வாக்காளர்கள்', en: 'Total Voters' },
  bjpMembers: { ta: 'BJP உறுப்பினர்கள்', en: 'BJP Members' },
  
  supportersVsVoters: { ta: 'ஆதரவாளர்கள் vs வாக்காளர்கள்', en: 'Supporters Vs Voters' },
  supporterPercentage: { ta: 'ஆதரவாளர் சதவீதம்', en: 'Supporter Percentage' },
  bjpSupporters: { ta: 'BJP ஆதரவாளர்கள்', en: 'BJP Supporters' },
  
  doorsVsTotalDoors: { ta: 'கதவுகள் vs மொத்த கதவுகள்', en: 'Doors Vs Total Doors' },
  doorPercentage: { ta: 'கதவு சதவீதம்', en: 'Door Percentage' },
  totalDoors: { ta: 'மொத்த கதவுகள்', en: 'Total Doors' },
  doorsCovered: { ta: 'பார்வையிட்ட கதவுகள்', en: 'Doors Covered' },
  
  pagesVsTotalPages: { ta: 'பக்கங்கள் vs மொத்த பக்கங்கள்', en: 'Pages Vs Total Pages' },
  pagePercentage: { ta: 'பக்க சதவீதம்', en: 'Page Percentage' },
  totalPages: { ta: 'மொத்த பக்கங்கள்', en: 'Total Pages' },
  pagesCovered: { ta: 'பார்வையிட்ட பக்கங்கள்', en: 'Pages Covered' },
  
  outOf: { ta: 'இல்', en: 'out of' },
  
  // Voter Tabs
  all: { ta: 'அனைத்தும்', en: 'All' },
  voters: { ta: 'வாக்காளர்கள்', en: 'Voters' },
  members: { ta: 'உறுப்பினர்கள்', en: 'Members' },
  cadres: { ta: 'தொண்டர்கள்', en: 'Cadres' },
  volunteers: { ta: 'தன்னார்வலர்கள்', en: 'Volunteers' },
  
  // Voter Details
  fatherName: { ta: 'தந்தை', en: 'Father' },
  husbandName: { ta: 'கணவர்', en: 'Husband' },
  voterId: { ta: 'வாக்காளர் எண்', en: 'Voter ID' },
  age: { ta: 'வயது', en: 'Age' },
  gender: { ta: 'பாலினம்', en: 'Gender' },
  male: { ta: 'ஆண்', en: 'Male' },
  female: { ta: 'பெண்', en: 'Female' },
  doorNumber: { ta: 'வீட்டு எண்', en: 'Door No' },
  
  // Status Badges
  supporter: { ta: 'ஆதரவாளர்', en: 'Supporter' },
  neutral: { ta: 'நடுநிலை', en: 'Neutral' },
  opponent: { ta: 'எதிரி', en: 'Opponent' },
  postalVoter: { ta: 'தபால் வாக்காளர்', en: 'Postal Voter' },
  deadDeleted: { ta: 'இறந்தவர்/நீக்கப்பட்டது', en: 'Dead/Deleted' },
  alliance: { ta: 'கூட்டணி', en: 'Alliance' },
  
  // Voter Actions
  addVoterMobile: { ta: 'கைபேசி எண் சேர்', en: 'Add Voter Mobile' },
  attachVoterPhoto: { ta: 'புகைப்படம் சேர்', en: 'Attach Voter Photo' },
  convertAsMember: { ta: 'உறுப்பினராக மாற்று', en: 'Convert As Member' },
  convertAsFamilyMember: { ta: 'குடும்ப உறுப்பினராக மாற்று', en: 'Convert As Family Member' },
  enhanceVoter: { ta: 'வாக்காளர் மேம்படுத்து', en: 'Enhance Voter' },
  sendBoothSlip: { ta: 'பூத் சீட்டு அனுப்பு', en: 'Send Booth Slip' },
  sendMessage: { ta: 'செய்தி அனுப்பு', en: 'Send Message' },
  assignCareTaker: { ta: 'பராமரிப்பாளர் ஒதுக்கு', en: 'Assign Care Taker' },
  markAsDone: { ta: 'முடிந்தது எனக் குறி', en: 'Mark As Done' },
  
  // Feedback
  shareYourVoice: { ta: 'உங்கள் குரல்', en: 'Share Your Voice' },
  messageCategory: { ta: 'வகை', en: 'Category' },
  selectCategory: { ta: 'வகை தேர்வு செய்', en: 'Select Category' },
  messageSubject: { ta: 'தலைப்பு', en: 'Subject' },
  enterSubject: { ta: 'தலைப்பு உள்ளிடவும்', en: 'Enter subject' },
  messageDescription: { ta: 'விளக்கம்', en: 'Description' },
  enterMessage: { ta: 'உங்கள் செய்தியை உள்ளிடவும்', en: 'Enter your message' },
  attachments: { ta: 'இணைப்புகள்', en: 'Attachments' },
  submit: { ta: 'சமர்ப்பி', en: 'Submit' },
  
  // Categories
  complaint: { ta: 'புகார்', en: 'Complaint' },
  suggestion: { ta: 'பரிந்துரை', en: 'Suggestion' },
  feedback: { ta: 'கருத்து', en: 'Feedback' },
  other: { ta: 'மற்றவை', en: 'Other' },
  
  // Auth
  login: { ta: 'உள்நுழை', en: 'Login' },
  signup: { ta: 'பதிவு செய்', en: 'Sign Up' },
  logout: { ta: 'வெளியேறு', en: 'Logout' },
  email: { ta: 'மின்னஞ்சல்', en: 'Email' },
  password: { ta: 'கடவுச்சொல்', en: 'Password' },
  fullName: { ta: 'முழு பெயர்', en: 'Full Name' },
  welcomeBack: { ta: 'மீண்டும் வருக!', en: 'Welcome Back!' },
  createAccount: { ta: 'கணக்கு உருவாக்கு', en: 'Create Account' },
  noAccount: { ta: 'கணக்கு இல்லையா?', en: "Don't have an account?" },
  haveAccount: { ta: 'ஏற்கனவே கணக்கு உள்ளதா?', en: 'Already have an account?' },
  
  // Home
  welcomeTo: { ta: 'வருக', en: 'Welcome to' },
  bjpCoimbatore: { ta: 'BJP கோயம்புத்தூர்', en: 'BJP Coimbatore' },
  boothVoterManagement: { ta: 'பூத் & வாக்காளர் மேலாண்மை', en: 'Booth & Voter Management' },
  getStarted: { ta: 'தொடங்கு', en: 'Get Started' },
  learnMore: { ta: 'மேலும் அறிய', en: 'Learn More' },
  
  // Leadership
  leadership: { ta: 'தலைமை', en: 'Leadership' },
  vanathiSreenivasan: { ta: 'வானதி ஸ்ரீநிவாசன்', en: 'Vanathi Sreenivasan' },
  presidentBJPWomensWing: { ta: 'தேசிய பெண்கள் அணி தலைவர்', en: 'National President, BJP Women\'s Wing' },
  
  // Search
  search: { ta: 'தேடு', en: 'Search' },
  searchVoters: { ta: 'வாக்காளர்களை தேடு', en: 'Search voters' },
  filter: { ta: 'வடிகட்டு', en: 'Filter' },
  
  // Common
  loading: { ta: 'ஏற்றுகிறது...', en: 'Loading...' },
  error: { ta: 'பிழை', en: 'Error' },
  success: { ta: 'வெற்றி', en: 'Success' },
  save: { ta: 'சேமி', en: 'Save' },
  cancel: { ta: 'ரத்து செய்', en: 'Cancel' },
  close: { ta: 'மூடு', en: 'Close' },
  back: { ta: 'பின்செல்', en: 'Back' },
  next: { ta: 'அடுத்து', en: 'Next' },
  
  // Dashboard Cards
  quickStats: { ta: 'விரைவு புள்ளிவிவரம்', en: 'Quick Stats' },
  recentActivity: { ta: 'சமீபத்திய செயல்பாடு', en: 'Recent Activity' },
  importData: { ta: 'தரவு இறக்குமதி', en: 'Import Data' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ta');

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
