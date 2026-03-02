// export const createIconView = (
//   data?: { success: number; failed: number } | null,
//   row?: ACCHub,
// ): React.ReactElement => {
//   return React.createElement(IdsCheckIcon, { data, row });
// };
import type { MemberItem, MemberListDto } from '@/lib/types/user.type';

// const getFileExtension = (filename: string): string => {
//   if (!filename) return '';
//   const parts = filename.split('.');
//   return parts.length > 1 ? parts[parts.length - 1] : '';
// };

// export const licenseListDto = (data: License[]): any[] => {
//   if (!data || data instanceof Error) {
//     return [];
//   }

//   const dataList: any[] = [];

//   data.map((item) => {
//     dataList.push({
//       id: item.id,
//       name: item.name,
//       type: item.type,
//       region: item.region,
//       package: item.package,
//     })
//   });

//   return dataList;
// }

export const memberListDto = (data: MemberItem[]): MemberListDto => {
  if (!data || data instanceof Error) {
    return [];
  }

  const dataList: MemberListDto = [];

  data.map((item) => {
    dataList.push({
      id: item.id,
      name: `${item.firstName || ''} ${item.lastName || ''}`,
      email: item.email,
      role: item.role,
      status: item.status || 'status.active',
    });
  });

  return dataList;
};
