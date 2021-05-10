import styled from 'styled-components';


export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid black;
  border-radius: 20px;
  height: 100%;

  button {
    border-radius: 0 0 25px 25px;
  }

  img {
    max-height: 200px;
    object-fit: cover;
    border-radius: 20px 20px 0 0;
  }

  div {
    font-family: 'Kanit', sans-serif;
    padding: 1rem;
    height: 100%;
  }
`;
