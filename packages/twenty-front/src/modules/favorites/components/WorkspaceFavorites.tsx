import { useFilteredObjectMetadataItemsForWorkspaceFavorites } from '@/navigation/hooks/useObjectMetadataItemsInWorkspaceFavorites';
import { NavigationDrawerSectionForObjectMetadataItems } from '@/object-metadata/components/NavigationDrawerSectionForObjectMetadataItems';
import { NavigationDrawerSectionForObjectMetadataItemsSkeletonLoader } from '@/object-metadata/components/NavigationDrawerSectionForObjectMetadataItemsSkeletonLoader';
import { useIsPrefetchLoading } from '@/prefetch/hooks/useIsPrefetchLoading';

type ObjectStandardType = {
  id: string;
  name: string;
  nameSingular: string;
  position: number;
};

export const WorkspaceFavorites = ({
  objects,
  skipObjects,
  sectionTitle,
}: {
  objects?: ObjectStandardType[];
  skipObjects?: ObjectStandardType[];
  sectionTitle?: string;
}) => {
  const { activeObjectMetadataItems: objectMetadataItemsToDisplay } =
    useFilteredObjectMetadataItemsForWorkspaceFavorites();

  const loading = useIsPrefetchLoading();

  if (loading) {
    return <NavigationDrawerSectionForObjectMetadataItemsSkeletonLoader />;
  }

  const objectNameSingular = objects?.map((item) => item?.nameSingular);
  const skipObjectsNameSingular = skipObjects?.map(
    (item) => item?.nameSingular,
  );

  const filterdObjectMetadataItemsToDisplay =
    objectMetadataItemsToDisplay.filter((item) => {
      let result = true;
      if (objectNameSingular !== undefined && objectNameSingular !== null) {
        result = (objectNameSingular ?? []).includes(item.nameSingular);
      }
      if (
        skipObjectsNameSingular !== undefined &&
        skipObjectsNameSingular !== null
      ) {
        result = !(skipObjectsNameSingular ?? []).includes(item.nameSingular);
      }
      return result;
    });

  return (
    <NavigationDrawerSectionForObjectMetadataItems
      sectionTitle={sectionTitle ?? 'Workspace'}
      objectMetadataItems={filterdObjectMetadataItemsToDisplay}
      isRemote={false}
    />
  );
};
