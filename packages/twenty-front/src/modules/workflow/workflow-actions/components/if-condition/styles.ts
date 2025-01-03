import styled from '@emotion/styled';

const StyledBarWrapper = styled.div`
  display: inline-flex;
  gap: ${({ theme }) => theme.spacing(2)};
`;
const StyledConditionWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-block: 15px;
`;

const StyledBlockWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  color: ${({ theme }) => theme.font.color.secondary};
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledJoinerWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  width: 80px;
`;

const StyledBlockHeaddergWraper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export {
  StyledBarWrapper,
  StyledBlockHeaddergWraper,
  StyledBlockWrapper,
  StyledConditionWrapper,
  StyledJoinerWrapper
};

