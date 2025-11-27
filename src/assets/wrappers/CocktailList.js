import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  
  & > * {
    animation: slideUp 0.6s ease-out backwards;
  }
  
  & > *:nth-child(1) { animation-delay: 0.1s; }
  & > *:nth-child(2) { animation-delay: 0.2s; }
  & > *:nth-child(3) { animation-delay: 0.3s; }
  & > *:nth-child(4) { animation-delay: 0.4s; }
  & > *:nth-child(5) { animation-delay: 0.5s; }
  & > *:nth-child(6) { animation-delay: 0.6s; }
  
  @keyframes slideUp {
    from {
      transform: translateY(30px);
    }
    to {
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export default Wrapper;
