import bcrypt from 'bcrypt';

export const hashValue = async (value: string): Promise<string> => await bcrypt.hash(value, 10);
export const compareHash = async (value: string, valueToCompare: string): Promise<boolean> => await bcrypt.compare(value, valueToCompare);
