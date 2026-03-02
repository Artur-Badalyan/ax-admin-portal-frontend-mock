import { Tabs as AntTabs } from 'antd';

type TabsProps = {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
};

type TabsContentProps = {
  value: string;
  children: React.ReactNode;
};

export function Tabs({ value, onValueChange, children }: TabsProps) {
  const items = (Array.isArray(children) ? children : [children])
    .filter(Boolean)
    .map((child: any) => child?.props)
    .map((props: any) => ({
      key: props.value,
      label: props.label,
      children: props.children,
    }));

  return <AntTabs activeKey={value} onChange={onValueChange} items={items} />;
}

export function TabsContent({ children }: TabsContentProps) {
  return <div>{children}</div>;
}

export function TabsList() {
  return null;
}

export function TabsTrigger() {
  return null;
}
