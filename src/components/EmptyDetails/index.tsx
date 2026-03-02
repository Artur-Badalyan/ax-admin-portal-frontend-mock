import React from 'react';
import { Card, Typography } from 'antd';
import { InboxIcon } from 'lucide-react';

import { cx } from 'antd-style';
import { useStyles } from './styles';

const EmptyDetails: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => {
  const { styles } = useStyles();

  return (
    <Card className={cx(styles.card, 'glass')}>
      <InboxIcon className={styles.icon} />
      <Typography.Title level={2} className={styles.title}>
        {title}
      </Typography.Title>
      {description && (
        <Typography.Text className={styles.description}>
          {description}
        </Typography.Text>
      )}
    </Card>
  );
};

export default EmptyDetails;
