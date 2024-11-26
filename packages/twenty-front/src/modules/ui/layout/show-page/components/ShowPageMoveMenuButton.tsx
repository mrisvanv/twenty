import { useMoveOneRecord } from '@/object-record/hooks/useMoveOneRecord';
import { MenuItem } from 'twenty-ui';

export const ShowPageMoveMenuButton = ({
  text,
  recordId,
  fromObjectNameSingular,
  toObjectNameSingular,
  onClick,
}: {
  text: string;
  recordId: string;
  fromObjectNameSingular: string;
  toObjectNameSingular: string;
  onClick?: () => void;
}) => {
  const { moveOneRecord } = useMoveOneRecord({
    fromObjectNameSingular: fromObjectNameSingular,
    toObjectNameSingular: toObjectNameSingular,
  });
  const handleMove = () => {
    moveOneRecord(recordId);
    onClick?.();
  };
  return <MenuItem onClick={handleMove} text={text} />;
};
