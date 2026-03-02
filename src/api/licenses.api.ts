import { mockLicenses, mockLicenseDetails } from '@/data/licenses';

// Mock API calls - no actual network requests
export const getLicenses = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockLicenses;
};

export const getLicenseDetails = async (id: string) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  const license = mockLicenseDetails[id];
  if (!license) {
    throw new Error(`License with id ${id} not found`);
  }
  return license;
};

export const assignLicenseToUser = async (
  licenseId: string,
  usersId: string[],
) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { success: true, licenseId, usersId };
};
