import { PageFavoriteButton } from '@/favorites/components/PageFavoriteButton';
import { PageFavoriteFoldersDropdown } from '@/favorites/components/PageFavoriteFolderDropdown';
import { FAVORITE_FOLDER_PICKER_DROPDOWN_ID } from '@/favorites/favorite-folder-picker/constants/FavoriteFolderPickerDropdownId';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { ObjectRecord } from '@/object-record/types/ObjectRecord';
import { ADD_PATIENT_PICKER_DROPDOWN_ID } from '@/patients/add-patient-picker/constants/AddPatientPickerDropdownId';
import { PageAddPatientDropdown } from '@/patients/components/PageAddPatientDropdown';
import { PageHeaderOpenCommandMenuButton } from '@/ui/layout/page-header/components/PageHeaderOpenCommandMenuButton';
import { ShowPageAddButton } from '@/ui/layout/show-page/components/ShowPageAddButton';
import { ShowPageMoveButton } from '@/ui/layout/show-page/components/ShowPageMoveButton';
import { useIsFeatureEnabled } from '@/workspace/hooks/useIsFeatureEnabled';
import { Button, IconUser } from 'twenty-ui';

type RecordShowPageBaseHeaderProps = {
  isFavorite: boolean;
  record: ObjectRecord | undefined;
  objectMetadataItem: ObjectMetadataItem;
  objectNameSingular: string;
  handleFavoriteButtonClick: () => void;
  lines: { id: string; name: string; nameSingular: string }[];
};

export const RecordShowPageBaseHeader = ({
  isFavorite,
  record,
  objectMetadataItem,
  objectNameSingular,
  handleFavoriteButtonClick,
  lines,
}: RecordShowPageBaseHeaderProps) => {
  const isFavoriteFolderEnabled = useIsFeatureEnabled(
    'IS_FAVORITE_FOLDER_ENABLED',
  );

  const linesNameSingular = lines.map((line) => line.nameSingular);

  const patientId = record?.patientId;
  return (
    <>
      {isFavoriteFolderEnabled ? (
        <PageFavoriteFoldersDropdown
          key={FAVORITE_FOLDER_PICKER_DROPDOWN_ID}
          dropdownId={FAVORITE_FOLDER_PICKER_DROPDOWN_ID}
          isFavorite={isFavorite}
          record={record}
          objectNameSingular={objectNameSingular}
        />
      ) : (
        <PageFavoriteButton
          isFavorite={isFavorite}
          onClick={handleFavoriteButtonClick}
        />
      )}
      <ShowPageAddButton
        key="add"
        activityTargetObject={{
          id: record?.id ?? '0',
          targetObjectNameSingular: objectMetadataItem.nameSingular,
        }}
      />
      {linesNameSingular.includes(objectNameSingular) && (
        <>
          <ShowPageMoveButton
            key="move-lead"
            recordId={record?.id ?? '0'}
            objectNameSingular={objectNameSingular}
            lines={lines}
          />
          {patientId === undefined || patientId === null || patientId === '' ? (
            <PageAddPatientDropdown
              key={ADD_PATIENT_PICKER_DROPDOWN_ID}
              dropdownId={ADD_PATIENT_PICKER_DROPDOWN_ID}
              record={record}
              objectNameSingular={objectNameSingular}
            />
          ) : (
            <Button
              key="view-patient"
              title="View Patient"
              variant="secondary"
              Icon={IconUser}
              onClick={() => {
                window.open(
                  `https://celebration.qa1.carestackqa.com/#/patient/${patientId}/patient-overview`,
                  '_blank',
                );
              }}
            />
          )}
        </>
      )}
      <PageHeaderOpenCommandMenuButton key="more" />
    </>
  );
};
