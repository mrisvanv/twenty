import { useFilteredObjectMetadataItemsForWorkspaceFavorites } from '@/navigation/hooks/useObjectMetadataItemsInWorkspaceFavorites';
import { NavigationDrawerSectionForObjectMetadataItems } from '@/object-metadata/components/NavigationDrawerSectionForObjectMetadataItems';
import { NavigationDrawerSectionForObjectMetadataItemsSkeletonLoader } from '@/object-metadata/components/NavigationDrawerSectionForObjectMetadataItemsSkeletonLoader';
import { useIsPrefetchLoading } from '@/prefetch/hooks/useIsPrefetchLoading';

export const WorkspaceFavorites = ({
  objects,
  skipObjects,
  sectionTitle,
}: {
  objects?: string[];
  skipObjects?: string[];
  sectionTitle?: string;
}) => {
  const { activeObjectMetadataItems: objectMetadataItemsToDisplay } =
    useFilteredObjectMetadataItemsForWorkspaceFavorites();

  const loading = useIsPrefetchLoading();

  if (loading) {
    return <NavigationDrawerSectionForObjectMetadataItemsSkeletonLoader />;
  }
  const filterdObjectMetadataItemsToDisplay =
    objectMetadataItemsToDisplay.filter((item) => {
      let result = true;
      if (objects !== undefined && objects !== null) {
        result = (objects ?? []).includes(item.nameSingular);
      }
      if (skipObjects !== undefined && skipObjects !== null) {
        result = !(skipObjects ?? []).includes(item.nameSingular);
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
