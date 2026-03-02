import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Flex, Typography, Card, Button, Tag } from 'antd';
import { PageSpinner } from '@/components/Loader';
import { useTranslation } from 'react-i18next';
import { FileText, User, Mail, Calendar, Package } from 'lucide-react';
import EmptyDetails from '@/components/EmptyDetails';
import { Modal } from '@/components/Modal';

import { requests, type RequestItem } from '@/data/requests';
import DetailsHeader from '@/components/DetailsHeader';
import APP_ROUTES from '@/lib/app.routes';

export function RequestDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { Text, Title } = Typography;

  const [request, setRequest] = useState<RequestItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  useEffect(() => {
    // Simulate fetching request details
    setLoading(true);
    setTimeout(() => {
      const foundRequest = requests.find((r) => r.id === id);
      setRequest(foundRequest || null);
      setLoading(false);
    }, 300);
  }, [id]);

  const handleAcceptRequest = () => {
    console.log('Accepting request:', id);
    // Mock success
    setIsAcceptModalOpen(false);
    navigate(APP_ROUTES.requests.path);
  };

  const handleRejectRequest = () => {
    console.log('Rejecting request:', id);
    // Mock success
    setIsRejectModalOpen(false);
    navigate(APP_ROUTES.requests.path);
  };

  if (loading) {
    return <PageSpinner />;
  }

  if (!request) {
    return (
      <EmptyDetails
        title={t('requestsPage.details.notFound')}
        description={t('requestsPage.details.notFoundDescription')}
      />
    );
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      case 'pending':
      default:
        return 'orange';
    }
  };

  return (
    <Flex vertical gap={24}>
      <DetailsHeader
        backUrl={APP_ROUTES.requests.path}
        title={t('requestsPage.details.title', {
          requester: request.requester,
        })}
        rightSection={
          request.status === 'pending' && (
            <>
              <Button type="primary" onClick={() => setIsAcceptModalOpen(true)}>
                {t('common.accept')}
              </Button>
              <Button danger onClick={() => setIsRejectModalOpen(true)}>
                {t('common.reject')}
              </Button>
            </>
          )
        }
      />

      {/* Hero Card with Request Info */}
      <Card className="glass">
        <Flex justify="space-between" align="center">
          <Flex gap={16} align="center">
            <div className="glass" style={{ padding: 8, borderRadius: 8 }}>
              <FileText size={28} />
            </div>
            <Flex vertical>
              <Text strong style={{ fontSize: 16 }}>
                {request.productName || request.assignment}
              </Text>
              <Text
                style={{
                  color: 'var(--color-text-secondary)',
                }}
              >
                {request.licenseType}
                {request.region && ` • ${request.region}`}
              </Text>
            </Flex>
          </Flex>
          <Tag color={getStatusColor(request.status)}>
            {request.status?.toUpperCase() || 'PENDING'}
          </Tag>
        </Flex>
      </Card>

      {/* Request Details Section */}
      <Card className="glass">
        <Flex vertical gap={24}>
          <Title level={3} style={{ margin: 0 }}>
            {t('requestsPage.details.requestInformation')}
          </Title>

          <Flex vertical gap={16}>
            {/* Requester */}
            <Flex gap={12} align="center">
              <User
                size={20}
                style={{ color: 'var(--color-text-secondary)' }}
              />
              <Flex vertical style={{ flex: 1 }}>
                <Text
                  style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}
                >
                  {t('requestsPage.details.requester')}
                </Text>
                <Text strong>{request.requester}</Text>
              </Flex>
            </Flex>

            {/* Email */}
            {request.email && (
              <Flex gap={12} align="center">
                <Mail
                  size={20}
                  style={{ color: 'var(--color-text-secondary)' }}
                />
                <Flex vertical style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: 12,
                    }}
                  >
                    {t('requestsPage.details.email')}
                  </Text>
                  <Text strong>{request.email}</Text>
                </Flex>
              </Flex>
            )}

            {/* Request Date */}
            {request.requestDate && (
              <Flex gap={12} align="center">
                <Calendar
                  size={20}
                  style={{ color: 'var(--color-text-secondary)' }}
                />
                <Flex vertical style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: 'var(--color-text-secondary)',
                      fontSize: 12,
                    }}
                  >
                    {t('requestsPage.details.requestDate')}
                  </Text>
                  <Text strong>
                    {new Date(request.requestDate).toLocaleDateString()}
                  </Text>
                </Flex>
              </Flex>
            )}

            {/* Assignment */}
            <Flex gap={12} align="center">
              <Package
                size={20}
                style={{ color: 'var(--color-text-secondary)' }}
              />
              <Flex vertical style={{ flex: 1 }}>
                <Text
                  style={{ color: 'var(--color-text-secondary)', fontSize: 12 }}
                >
                  {t('requestsPage.details.assignment')}
                </Text>
                <Text strong>{request.assignment}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>

      {/* Additional Notes Section */}
      {request.notes && (
        <Card className="glass">
          <Flex vertical gap={16}>
            <Title level={3} style={{ margin: 0 }}>
              {t('requestsPage.details.notes')}
            </Title>
            <Text style={{ color: 'var(--color-text-secondary)' }}>
              {request.notes}
            </Text>
          </Flex>
        </Card>
      )}

      {/* Accept Confirmation Modal */}
      <Modal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        title={t('requestsPage.details.acceptModalTitle')}
        description={t('requestsPage.details.acceptModalDescription', {
          requester: request.requester,
        })}
        onConfirm={handleAcceptRequest}
      />

      {/* Reject Confirmation Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title={t('requestsPage.details.rejectModalTitle')}
        description={t('requestsPage.details.rejectModalDescription', {
          requester: request.requester,
        })}
        onConfirm={handleRejectRequest}
      />
    </Flex>
  );
}
