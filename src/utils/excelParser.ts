import * as XLSX from 'xlsx';

export interface VoterExcelRow {
  name: string;
  name_tamil?: string;
  voter_id?: string;
  age?: number;
  gender?: 'male' | 'female' | 'other';
  father_name?: string;
  father_name_tamil?: string;
  address?: string;
  door_number?: string;
  page_number?: number;
  booth_id?: string;
}

export const parseVoterExcel = async (file: File): Promise<VoterExcelRow[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
        
        // Map Excel columns to voter fields
        const voters: VoterExcelRow[] = jsonData.map((row: any) => {
          // Try to map common column names (adjust based on actual Excel structure)
          return {
            name: row['Name'] || row['NAME'] || row['name'] || row['VOTER_NAME'] || row['Voter Name'] || '',
            name_tamil: row['Name Tamil'] || row['NAME_TAMIL'] || row['Tamil Name'] || row['தமிழ் பெயர்'] || '',
            voter_id: row['Voter ID'] || row['VOTER_ID'] || row['voter_id'] || row['EPIC_NO'] || row['Epic No'] || '',
            age: parseInt(row['Age'] || row['AGE'] || row['age'] || '0') || undefined,
            gender: mapGender(row['Gender'] || row['GENDER'] || row['gender'] || row['SEX'] || row['Sex']),
            father_name: row['Father Name'] || row['FATHER_NAME'] || row['father_name'] || row['REL_NAME'] || '',
            father_name_tamil: row['Father Name Tamil'] || row['FATHER_NAME_TAMIL'] || '',
            address: row['Address'] || row['ADDRESS'] || row['address'] || '',
            door_number: row['Door No'] || row['DOOR_NO'] || row['door_number'] || row['House No'] || '',
            page_number: parseInt(row['Page No'] || row['PAGE_NO'] || row['page_number'] || row['SL_NO'] || '0') || undefined,
          };
        }).filter(v => v.name); // Filter out empty rows
        
        resolve(voters);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  });
};

const mapGender = (value: string): 'male' | 'female' | 'other' | undefined => {
  if (!value) return undefined;
  const lower = value.toLowerCase().trim();
  if (lower === 'm' || lower === 'male' || lower === 'ஆண்') return 'male';
  if (lower === 'f' || lower === 'female' || lower === 'பெண்') return 'female';
  if (lower === 'o' || lower === 'other' || lower === 'மற்றவை') return 'other';
  return undefined;
};

export const parseVoterExcelFromUrl = async (url: string): Promise<VoterExcelRow[]> => {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], 'voters.xlsx', { type: blob.type });
  return parseVoterExcel(file);
};
