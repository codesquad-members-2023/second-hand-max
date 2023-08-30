import { styled } from 'styled-components';

const FieldLabel: React.FC<{ id: string; text: string }> = ({ id, text }) => {
  return <LabelContainer htmlFor={id}>{text}</LabelContainer>;
};

const LabelContainer = styled.label`
  ${({ theme: { fonts } }) => fonts.display.strong16};
`;

export default FieldLabel;
