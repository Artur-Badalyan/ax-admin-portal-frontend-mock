import React from 'react';
import { Flex, Button, Card, Typography } from 'antd';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { cx } from 'antd-style';
import { useStyles } from './styles';

const { Text, Title } = Typography;

const DetailsHeader: React.FC<{
  backUrl?: string;
  title: string;
  secondaryTitle?: string;
  rightSection?: React.ReactNode;
}> = ({ title, secondaryTitle, backUrl, rightSection }) => {
  const { styles } = useStyles();
  const navigate = useNavigate();

  return (
    <Card rootClassName={cx(styles.container)}>
      <Flex align="flex-end" gap={12}>
        {backUrl && (
          <Button onClick={() => navigate(backUrl)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <Title level={4} style={{ margin: 0 }}>
          {title}
        </Title>
        {secondaryTitle && <Text type="secondary">{secondaryTitle}</Text>}
      </Flex>

      <Flex gap={12}>{rightSection}</Flex>
    </Card>
  );
};

export default DetailsHeader;
