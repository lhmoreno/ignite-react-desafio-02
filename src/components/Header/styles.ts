import styled from "styled-components"

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;

  div {
    display: flex;
    gap: 0.75rem;

    a {
      width: 2.375rem;
      height: 2.375rem;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: ${(props) => props.theme['yellow-100']};
      color: ${(props) => props.theme['orange-600']};

      border-radius: 6px;
      transition: background-color 0.3s;

      &:hover {
        background-color: ${(props) => props.theme['yellow-200']};
      }

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }
  }
`

export const Location = styled.span`
  height: 2.375rem;
  padding: 0 0.5rem;
  font-size: 0.875rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  background-color: ${(props) => props.theme['purple-100']};
  color: ${(props) => props.theme['purple-800']};

  border-radius: 6px;

  svg {
    width: 1.25rem;
    height: 1.25rem;
    color: ${(props) => props.theme['purple-500']};
  }
`
