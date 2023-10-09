// import useIntersection from "@hooks/useIntersection";
import useOutsideClick from "@hooks/useOutsideClick";
import { zDropdown } from "@styles/constants/zIndex";
import { MouseEvent, ReactNode, RefObject, useRef, useState } from "react";
import { styled } from "styled-components";

type Props = {
  leftOrRight: "left" | "right";
  buttonContent: ReactNode;
  boundaryElementRef?: RefObject<Element>;
  children: ReactNode;
};

export default function Dropdown({
  leftOrRight,
  buttonContent,
  // boundaryElementRef,
  children,
}: Props) {
  const dropdownRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  // const intersectingSide = useIntersection(dropdownRef, boundaryElementRef);
  const containerRef = useOutsideClick(() => setIsOpen(false));

  const onToggleIsOpen = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <StyledDropdown ref={containerRef}>
      <DropdownButtonContainer {...{ type: "button", onClick: onToggleIsOpen }}>
        {buttonContent}
      </DropdownButtonContainer>

      {isOpen && children && (
        <DropdownList
          {...{
            ref: dropdownRef,
            // $intersectingSide: intersectingSide,
            $leftOrRight: leftOrRight,
            onClick: () => setIsOpen(false),
          }}>
          {children}
        </DropdownList>
      )}
    </StyledDropdown>
  );
}

const StyledDropdown = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  position: relative;
`;

const DropdownButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownList = styled.ul<{ $leftOrRight: "left" | "right" }>`
  width: 240px;
  position: absolute;
  top: 105%;
  left: ${({ $leftOrRight }) => ($leftOrRight === "left" ? "5px" : "auto")};
  right: ${({ $leftOrRight }) => $leftOrRight === "right" && "5px"};
  background-color: ${({ theme: { color } }) => color.neutral.background};
  border-radius: 12px;
  box-shadow: 0px 4px 4px 0px #00000040;
  z-index: ${zDropdown};
`;
