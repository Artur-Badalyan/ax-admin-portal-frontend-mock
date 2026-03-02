import { Button, Flex } from 'antd';

interface RevokeButtonProps {
  data: any;
  customProps?: {
    onRevoke?: (data: any) => void;
  };
}

const RevokeButton = ({ data, customProps }: RevokeButtonProps) => {
  const handleRevoke = () => {
    if (customProps?.onRevoke) {
      customProps.onRevoke(data);
    } else {
      console.log('Revoke license', data.id);
    }
  };

  return (
    <Flex align="center">
      <Button onClick={handleRevoke}>Revoke</Button>
    </Flex>
  );
};

export default RevokeButton;
