export type DatasetItem = {
  name: string;
  domainKey: string;
  steward: string;
  freshnessKey: string;
  records: string;
};

export const datasets: DatasetItem[] = [
  {
    name: 'Customer 360',
    domainKey: 'orgData.domains.customer',
    steward: 'Nora Singh',
    freshnessKey: 'status.fresh',
    records: '1.2M',
  },
  {
    name: 'Orders & Fulfillment',
    domainKey: 'orgData.domains.commerce',
    steward: 'Cody Fisher',
    freshnessKey: 'status.stale',
    records: '860K',
  },
  {
    name: 'Access Policies',
    domainKey: 'orgData.domains.security',
    steward: 'Jenny Wilson',
    freshnessKey: 'status.fresh',
    records: '54K',
  },
  {
    name: 'Operational Metrics',
    domainKey: 'orgData.domains.platform',
    steward: 'Dev Ops',
    freshnessKey: 'status.refreshing',
    records: '6.4M',
  },
];
