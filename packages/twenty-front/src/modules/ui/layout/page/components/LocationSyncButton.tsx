import { Button, IconRefresh } from 'twenty-ui';

type LocationSyncButtonProps = {
  onClick: () => void;
};

export const LocationSyncButton = ({ onClick }: LocationSyncButtonProps) => (
  <Button
    Icon={IconRefresh}
    title="Sync"
    size="medium"
    dataTestId="location-sync-button"
    accent="default"
    variant="secondary"
    onClick={onClick}
  />
);
