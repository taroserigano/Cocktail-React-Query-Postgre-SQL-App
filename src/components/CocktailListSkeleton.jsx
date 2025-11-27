import styled from 'styled-components';

const CocktailCardSkeleton = () => {
  return (
    <Wrapper>
      <div className='skeleton-img'></div>
      <div className='skeleton-footer'>
        <div className='skeleton-title'></div>
        <div className='skeleton-subtitle'></div>
        <div className='skeleton-text'></div>
        <div className='skeleton-button'></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  display: grid;
  grid-template-rows: auto 1fr;
  border-radius: var(--borderRadiusXL);
  overflow: hidden;
  border: 2px solid rgba(168, 85, 247, 0.2);
  
  .skeleton-img {
    height: 18rem;
    background: linear-gradient(
      90deg,
      rgba(168, 85, 247, 0.1) 0%,
      rgba(168, 85, 247, 0.2) 50%,
      rgba(168, 85, 247, 0.1) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
  
  .skeleton-footer {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .skeleton-title {
    height: 1.5rem;
    width: 80%;
    background: linear-gradient(
      90deg,
      rgba(168, 85, 247, 0.1) 0%,
      rgba(168, 85, 247, 0.2) 50%,
      rgba(168, 85, 247, 0.1) 100%
    );
    background-size: 200% 100%;
    border-radius: var(--borderRadius);
    animation: shimmer 2s infinite;
  }
  
  .skeleton-subtitle {
    height: 1rem;
    width: 50%;
    background: linear-gradient(
      90deg,
      rgba(168, 85, 247, 0.1) 0%,
      rgba(168, 85, 247, 0.2) 50%,
      rgba(168, 85, 247, 0.1) 100%
    );
    background-size: 200% 100%;
    border-radius: var(--borderRadius);
    animation: shimmer 2s infinite 0.2s;
  }
  
  .skeleton-text {
    height: 3rem;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(168, 85, 247, 0.1) 0%,
      rgba(168, 85, 247, 0.2) 50%,
      rgba(168, 85, 247, 0.1) 100%
    );
    background-size: 200% 100%;
    border-radius: var(--borderRadius);
    animation: shimmer 2s infinite 0.4s;
  }
  
  .skeleton-button {
    height: 2.5rem;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(168, 85, 247, 0.2) 0%,
      rgba(168, 85, 247, 0.3) 50%,
      rgba(168, 85, 247, 0.2) 100%
    );
    background-size: 200% 100%;
    border-radius: var(--borderRadius);
    animation: shimmer 2s infinite 0.6s;
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

const CocktailListSkeleton = () => {
  return (
    <SkeletonWrapper>
      {Array.from({ length: 6 }).map((_, index) => (
        <CocktailCardSkeleton key={index} />
      ))}
    </SkeletonWrapper>
  );
};

const SkeletonWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export default CocktailListSkeleton;
