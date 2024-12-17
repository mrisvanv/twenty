import { useLocation } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IconSearch, IconSettings } from 'twenty-ui';

import { useCommandMenu } from '@/command-menu/hooks/useCommandMenu';
import { CurrentWorkspaceMemberFavoritesFolders } from '@/favorites/components/CurrentWorkspaceMemberFavoritesFolders';
import { WorkspaceFavorites } from '@/favorites/components/WorkspaceFavorites';
import { NavigationDrawerOpenedSection } from '@/object-metadata/components/NavigationDrawerOpenedSection';
import { RemoteNavigationDrawerSection } from '@/object-metadata/components/RemoteNavigationDrawerSection';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { isNavigationDrawerExpandedState } from '@/ui/navigation/states/isNavigationDrawerExpanded';
import { navigationDrawerExpandedMemorizedState } from '@/ui/navigation/states/navigationDrawerExpandedMemorizedState';
import { navigationMemorizedUrlState } from '@/ui/navigation/states/navigationMemorizedUrlState';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';
import { ScrollWrapper } from '@/ui/utilities/scroll/components/ScrollWrapper';
import styled from '@emotion/styled';

const StyledMainSection = styled(NavigationDrawerSection)`
  min-height: fit-content;
`;

export const MainNavigationDrawerItems = () => {
  const isMobile = useIsMobile();
  const { toggleCommandMenu } = useCommandMenu();
  const location = useLocation();
  const setNavigationMemorizedUrl = useSetRecoilState(
    navigationMemorizedUrlState,
  );

  const [isNavigationDrawerExpanded, setIsNavigationDrawerExpanded] =
    useRecoilState(isNavigationDrawerExpandedState);
  const setNavigationDrawerExpandedMemorized = useSetRecoilState(
    navigationDrawerExpandedMemorizedState,
  );
  const LEADS: {
    id: string;
    name: string;
    nameSingular: string;
    position: number;
  }[] = [
    {
      id: 'unsorted',
      name: 'Unsorted',
      nameSingular: 'unsortedItem',
      position: 0,
    },
    {
      id: 'preventiveCare',
      name: 'Preventive Care',
      nameSingular: 'preventiveCareItem',
      position: 1,
    },
    {
      id: 'restorative',
      name: 'Restorative',
      nameSingular: 'restorativeDentistryItem',
      position: 2,
    },
    {
      id: 'cosmetic',
      name: 'Cosmetic',
      nameSingular: 'cosmeticDentistryItem',
      position: 3,
    },
    {
      id: 'orthodontics',
      name: 'Orthodontics',
      nameSingular: 'orthodonticsItem',
      position: 4,
    },
    {
      id: 'emergency',
      name: 'Emergency Care',
      nameSingular: 'emergencyCareItem',
      position: 5,
    },
    {
      id: 'spam',
      name: 'Spam',
      nameSingular: 'spamItem',
      position: 6,
    },
  ];

  return (
    <>
      {!isMobile && (
        <StyledMainSection>
          <NavigationDrawerItem
            label="Search"
            Icon={IconSearch}
            onClick={toggleCommandMenu}
            keyboard={['⌘', 'K']}
          />
          <NavigationDrawerItem
            label="Settings"
            to={'/settings/profile'}
            onClick={() => {
              setNavigationDrawerExpandedMemorized(isNavigationDrawerExpanded);
              setIsNavigationDrawerExpanded(true);
              setNavigationMemorizedUrl(location.pathname + location.search);
            }}
            Icon={IconSettings}
          />
        </StyledMainSection>
      )}
      <ScrollWrapper
        contextProviderName="navigationDrawer"
        enableXScroll={false}
        scrollHide={true}
      >
        <NavigationDrawerOpenedSection />
        <CurrentWorkspaceMemberFavoritesFolders />
        <WorkspaceFavorites objects={LEADS} sectionTitle={'Leads'} />
        <WorkspaceFavorites skipObjects={LEADS} />
        <RemoteNavigationDrawerSection />
      </ScrollWrapper>
    </>
  );
};
