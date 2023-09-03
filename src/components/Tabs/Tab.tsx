import { NavLink } from 'react-router-dom';
import { css, styled } from 'styled-components';

const Tab = styled(
  ({
    path,
    icon: Icon,
    text,
    ...props
  }: {
    path: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    text: string;
  }) => {
    return (
      <NavLink to={path} {...props}>
        <Icon />
        <span>{text}</span>
      </NavLink>
    );
  },
)`
  ${({ theme: { fonts, colors } }) => css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    ${fonts.available.strong10}

    color:  ${colors.neutral.textWeak};
    stroke: ${colors.neutral.textWeak};

    &.active {
      pointer-events: none;
      color: ${colors.neutral.textStrong};
      stroke: ${colors.neutral.textStrong};
    }
  `}
`;

export default Tab;
