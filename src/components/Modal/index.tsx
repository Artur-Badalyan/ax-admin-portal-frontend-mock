import type { ReactNode } from 'react';
import { Modal as AntdModal, Button, Flex, Typography } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

const { Text } = Typography;

interface ModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  size?: '1' | '2' | '3' | '4';
  maxWidth?: string;
  children?: ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
}

export const Modal = ({
  isOpen,
  title,
  description,
  maxWidth,
  children,
  onClose,
  onConfirm,
}: ModalProps) => {
  const { t } = useTranslation();
  const customStyle = maxWidth
    ? { maxWidth, width: '90vw' }
    : { width: '90vw' };

  return (
    <AntdModal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={customStyle.maxWidth}
      style={{ maxWidth: customStyle.maxWidth, width: customStyle.width }}
      closeIcon={<CloseOutlined />}
    >
      <Flex vertical gap={8} style={{ marginBottom: 16 }}>
        <Text strong>{title}</Text>
        {description && <Text type="secondary">{description}</Text>}
      </Flex>

      <div style={{ marginBottom: onConfirm ? 16 : 0 }}>{children}</div>

      {onConfirm && (
        <Flex justify="end" gap={8}>
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button onClick={onConfirm}>{t('common.confirm')}</Button>
        </Flex>
      )}
    </AntdModal>
  );
};

export default Modal;
