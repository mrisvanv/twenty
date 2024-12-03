import { currentWorkspaceState } from '@/auth/states/currentWorkspaceState';
import { PageFavoriteFoldersDropdown } from '@/favorites/components/PageFavoriteFolderDropdown';
import { FAVORITE_FOLDER_PICKER_DROPDOWN_ID } from '@/favorites/favorite-folder-picker/constants/FavoriteFolderPickerDropdownId';
import { useFavorites } from '@/favorites/hooks/useFavorites';
import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { isObjectMetadataReadOnly } from '@/object-metadata/utils/isObjectMetadataReadOnly';
import { RecordIndexPageKanbanAddButton } from '@/object-record/record-index/components/RecordIndexPageKanbanAddButton';
import { RecordIndexRootPropsContext } from '@/object-record/record-index/contexts/RecordIndexRootPropsContext';
import { recordIndexViewTypeState } from '@/object-record/record-index/states/recordIndexViewTypeState';
import { usePrefetchedData } from '@/prefetch/hooks/usePrefetchedData';
import { PrefetchKey } from '@/prefetch/types/PrefetchKey';
import { SnackBarVariant } from '@/ui/feedback/snack-bar-manager/components/SnackBar';
import { useSnackBar } from '@/ui/feedback/snack-bar-manager/hooks/useSnackBar';
import { LocationSyncButton } from '@/ui/layout/page/components/LocationSyncButton';
import { PageAddButton } from '@/ui/layout/page/components/PageAddButton';
import { PageHeader } from '@/ui/layout/page/components/PageHeader';
import { PageHotkeysEffect } from '@/ui/layout/page/components/PageHotkeysEffect';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';
import { currentViewIdComponentState } from '@/views/states/currentViewIdComponentState';
import { View } from '@/views/types/View';
import { ViewType } from '@/views/types/ViewType';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useIcons } from 'twenty-ui';
import { useSyncLocationMutation } from '~/generated/graphql';
import { capitalize } from '~/utils/string/capitalize';

export const RecordIndexPageHeader = () => {
  const [syncLocationMutation] = useSyncLocationMutation();
  const { findObjectMetadataItemByNamePlural } =
    useFilteredObjectMetadataItems();
  const isFavoriteFolderEnabled = useIsFeatureEnabled(
    'IS_FAVORITE_FOLDER_ENABLED',
  );

  const { objectNamePlural, onCreateRecord, recordIndexId } = useContext(
    RecordIndexRootPropsContext,
  );
  const { records: views } = usePrefetchedData<View>(PrefetchKey.AllViews);
  const currentViewId = useRecoilComponentValueV2(
    currentViewIdComponentState,
    recordIndexId,
  );

  const currentWorkspace = useRecoilValue(currentWorkspaceState);

  const view = views.find((view) => view.id === currentViewId);

  const { sortedFavorites: favorites } = useFavorites();

  const isFavorite = favorites.some(
    (favorite) =>
      favorite.recordId === currentViewId && favorite.workspaceMemberId,
  );

  const objectMetadataItem =
    findObjectMetadataItemByNamePlural(objectNamePlural);

  const { getIcon } = useIcons();
  const Icon = getIcon(
    findObjectMetadataItemByNamePlural(objectNamePlural)?.icon,
  );

  const recordIndexViewType = useRecoilValue(recordIndexViewTypeState);

  const shouldDisplayAddButton = objectMetadataItem
    ? !isObjectMetadataReadOnly(objectMetadataItem)
    : false;

  const isLocationPage = objectMetadataItem?.nameSingular === 'location';

  const isTable = recordIndexViewType === ViewType.Table;

  const pageHeaderTitle =
    objectMetadataItem?.labelPlural ?? capitalize(objectNamePlural);

  const handleAddButtonClick = () => {
    onCreateRecord();
  };
  const { enqueueSnackBar } = useSnackBar();
  const navigate = useNavigate();
  const handleLocationSyncButtonClick = async () => {
    try {
      const { data } = await syncLocationMutation({
        variables: {
          workspaceId: currentWorkspace?.id,
        },
      });

      if (data?.syncLocation?.success === true) {
        enqueueSnackBar('Location Sync Completed', {
          variant: SnackBarVariant.Success,
        });
        navigate('/objects/locations');
      } else {
        enqueueSnackBar('There was some issue', {
          variant: SnackBarVariant.Error,
        });
      }
    } catch (error) {
      enqueueSnackBar((error as Error).message, {
        variant: SnackBarVariant.Error,
      });
    }
  };

  return (
    <PageHeader title={pageHeaderTitle} Icon={Icon}>
      <PageHotkeysEffect onAddButtonClick={handleAddButtonClick} />
      {isFavoriteFolderEnabled && (
        <PageFavoriteFoldersDropdown
          record={view}
          dropdownId={FAVORITE_FOLDER_PICKER_DROPDOWN_ID}
          objectNameSingular="view"
          isFavorite={isFavorite}
        />
      )}
      {isLocationPage && (
        <LocationSyncButton onClick={handleLocationSyncButtonClick} />
      )}
      {shouldDisplayAddButton &&
        (isTable ? (
          <PageAddButton onClick={handleAddButtonClick} />
        ) : (
          <RecordIndexPageKanbanAddButton />
        ))}
    </PageHeader>
  );
};
