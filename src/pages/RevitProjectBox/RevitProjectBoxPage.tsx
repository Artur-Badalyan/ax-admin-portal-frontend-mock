import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Key,
  Package,
  Globe,
  Calendar,
  DollarSign,
  FileText,
  Monitor,
  Copy,
} from 'lucide-react';
import { Flex } from 'antd';
import { Text } from '@/components/common/Text';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { revitProjectBoxData } from '@/data/revitProjectBox';

export function RevitProjectBoxPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCopyKey = () => {
    navigator.clipboard.writeText(revitProjectBoxData.licenseKey);
  };

  return (
    <div
      style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      {/* Header */}
      <Flex align="center" gap={12}>
        <Button onClick={() => navigate('/')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Text
          size="3xl"
          className="text-slate-900 dark:text-white font-semibold"
        >
          {revitProjectBoxData.title}
        </Text>
      </Flex>

      {/* Main Content */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0,1fr))',
          gap: 24,
        }}
      >
        {/* Left Column - License Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            className="glass"
            style={{
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <Flex align="center" gap={12}>
              <Key size={20} />
              <Text size="md">{revitProjectBoxData.licenseType}</Text>
            </Flex>

            <Flex
              align="center"
              gap={12}
              style={{
                background: 'rgba(0,0,0,0.04)',
                padding: 12,
                borderRadius: 8,
              }}
            >
              <Key size={20} />
              <Text size="md" style={{ fontFamily: 'monospace' }}>
                {revitProjectBoxData.licenseKey}
              </Text>
              <Button onClick={handleCopyKey} style={{ marginLeft: 'auto' }}>
                <Copy size={16} />
              </Button>
            </Flex>

            <Flex align="center" gap={12}>
              <Package size={20} />
              <Text size="md">
                {t('revitProjectBoxPage.package')}:{' '}
                {revitProjectBoxData.package}
              </Text>
            </Flex>

            <Flex align="center" gap={12}>
              <Globe size={20} />
              <Text size="md">
                {t('revitProjectBoxPage.region')}: {revitProjectBoxData.region}
              </Text>
            </Flex>
          </div>
        </div>

        {/* Right Column - Subscription Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            className="glass"
            style={{
              borderRadius: 16,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <Flex align="center" gap={12}>
              <Calendar size={20} />
              <Text size="md">
                {t('revitProjectBoxPage.autoRenew')}:{' '}
                {revitProjectBoxData.autoRenew}
              </Text>
            </Flex>

            <Flex align="center" gap={12}>
              <DollarSign size={20} />
              <Text size="md">
                {t('revitProjectBoxPage.price')}: {revitProjectBoxData.price}
              </Text>
            </Flex>

            <Flex align="center" gap={12}>
              <FileText size={20} />
              <Text size="md">
                {t('revitProjectBoxPage.cancellationDate')}:{' '}
                {revitProjectBoxData.cancellationDate}
              </Text>
            </Flex>

            <Button onClick={() => navigate('/billing')}>
              {t('revitProjectBoxPage.cancelSubscription')}
            </Button>
          </div>
        </div>
      </div>

      {/* Installations Section */}
      <div
        className="glass"
        style={{
          borderRadius: 16,
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Flex justify="space-between" align="center">
          <Flex align="center" gap={12}>
            <Text size="2xl" style={{ fontWeight: 600 }}>
              {t('revitProjectBoxPage.installations')}
            </Text>
            <Button>{t('revitProjectBoxPage.sendKeyViaMail')}</Button>
          </Flex>
          <Text size="sm">
            {revitProjectBoxData.usedInstallations}{' '}
            {t('revitProjectBoxPage.usedInstallations')} /{' '}
            {revitProjectBoxData.totalInstallations}{' '}
            {t('revitProjectBoxPage.spareInstallations')}
          </Text>
        </Flex>

        <div>
          <Text size="sm">
            ⓘ {t('revitProjectBoxPage.licenseKeyReleasedDescription')}
          </Text>
        </div>

        {/* Installations List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {revitProjectBoxData.installations.map((installation) => (
            <div
              key={installation.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 16,
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.05)',
                background: 'rgba(255,255,255,0.6)',
              }}
            >
              <Flex align="center" gap={12}>
                <Monitor size={20} />
                <Text size="md">{installation.name}</Text>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
