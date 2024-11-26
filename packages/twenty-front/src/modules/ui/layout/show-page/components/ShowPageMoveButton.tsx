import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Button, IconArrowRight } from 'twenty-ui';

import { useDeleteOneRecord } from '@/object-record/hooks/useDeleteOneRecord';
import { PageHotkeyScope } from '@/types/PageHotkeyScope';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { navigationMemorizedUrlState } from '@/ui/navigation/states/navigationMemorizedUrlState';

import { useRestoreManyRecords } from '@/object-record/hooks/useRestoreManyRecords';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';
import { Dropdown } from '../../dropdown/components/Dropdown';
import { DropdownMenu } from '../../dropdown/components/DropdownMenu';
import { ShowPageMoveMenuButton } from './ShowPageMoveMenuButton';

const StyledContainer = styled.div`
  z-index: 1;
`;

export const ShowPageMoveButton = ({
  recordId,
  objectNameSingular,
  lines,
}: {
  recordId: string;
  objectNameSingular: string;
  lines: { id: string; name: string; nameSingular: string }[];
}) => {
  const { closeDropdown, toggleDropdown } = useDropdown('move-show-page');
  const navigationMemorizedUrl = useRecoilValue(navigationMemorizedUrlState);
  const navigate = useNavigate();

  const { deleteOneRecord } = useDeleteOneRecord({
    objectNameSingular,
  });

  const { restoreManyRecords } = useRestoreManyRecords({
    objectNameSingular,
  });

  const [recordFromStore] = useRecoilState<any>(
    recordStoreFamilyState(recordId),
  );

  const handleClick = () => {
    closeDropdown();
    navigate(navigationMemorizedUrl);
  };

  const moveToLines = lines.filter(
    (line) => line.nameSingular !== objectNameSingular,
  );

  return (
    <StyledContainer>
      <Dropdown
        dropdownId="move-show-page"
        clickableComponent={
          <Button
            Icon={IconArrowRight}
            title="Move To"
            size="medium"
            dataTestId="move-showpage-button"
            accent="default"
            variant="secondary"
            onClick={toggleDropdown}
          />
        }
        dropdownComponents={
          <DropdownMenu>
            <DropdownMenuItemsContainer>
              {moveToLines.map((line) => (
                <ShowPageMoveMenuButton
                  onClick={() => handleClick()}
                  text={line.name}
                  recordId={recordId}
                  fromObjectNameSingular={objectNameSingular}
                  toObjectNameSingular={line.nameSingular}
                />
              ))}
            </DropdownMenuItemsContainer>
          </DropdownMenu>
        }
        dropdownHotkeyScope={{
          scope: PageHotkeyScope.ShowPage,
        }}
      />
    </StyledContainer>
  );
};
