import styled from 'styled-components';

const Wrapper = styled.div`
  header {
    text-align: center;
    margin-bottom: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.5rem;
    
    .btn {
      font-family: 'Orbitron', sans-serif;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      padding: 0.875rem 2rem;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: var(--borderRadius);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      background: linear-gradient(135deg, var(--primary-600) 0%, var(--accent-600) 100%);
      background-size: 200% auto;
      border: 2px solid rgba(168, 85, 247, 0.4);
      position: relative;
      overflow: hidden;
    }
    
    .btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
      transition: left 0.6s ease;
    }
    
    .btn:hover {
      background-position: right center;
      box-shadow: 0 0 40px rgba(168, 85, 247, 0.8);
      border-color: rgba(168, 85, 247, 0.6);
      transform: translateY(-3px);
    }
    
    .btn:hover::before {
      left: 100%;
    }
  }
  
  .drink {
    background: rgba(255, 255, 255, 0.02);
    backdrop-filter: blur(30px);
    border-radius: var(--borderRadiusXL);
    padding: 3rem;
    border: 2px solid rgba(168, 85, 247, 0.3);
    box-shadow: 0 0 60px rgba(168, 85, 247, 0.3),
                0 8px 32px rgba(0, 0, 0, 0.5);
    position: relative;
    overflow: hidden;
  }
  
  .drink::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--neon-purple), var(--primary-500), var(--accent-500), var(--neon-blue));
    background-size: 300% auto;
    animation: shimmer 4s linear infinite;
  }
  
  .img {
    border-radius: var(--borderRadiusXL);
    box-shadow: 0 0 40px rgba(168, 85, 247, 0.4);
    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    border: 2px solid rgba(168, 85, 247, 0.3);
  }
  
  .img:hover {
    box-shadow: 0 0 60px rgba(168, 85, 247, 0.8);
    transform: scale(1.02);
  }
  
  .drink-info {
    padding-top: 2rem;
  }
  
  .drink-info h2 {
    font-family: 'Orbitron', sans-serif;
    background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 1.5rem;
    font-size: 2rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  .drink p {
    font-weight: 500;
    text-transform: capitalize;
    line-height: 2;
    margin-bottom: 1.5rem;
    color: var(--grey-200);
    font-size: 1.05rem;
  }
  
  .drink-data {
    margin-right: 0.75rem;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%);
    padding: 0.5rem 1rem;
    border-radius: var(--borderRadius);
    color: var(--primary-400);
    letter-spacing: 0.05em;
    font-weight: 700;
    border: 2px solid rgba(168, 85, 247, 0.3);
    font-family: 'Orbitron', sans-serif;
    text-transform: uppercase;
    font-size: 0.85rem;
  }
  
  .ing {
    display: inline-block;
    margin-right: 0.75rem;
    margin-bottom: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    padding: 0.625rem 1.25rem;
    border-radius: var(--borderRadius);
    color: var(--grey-300);
    font-weight: 600;
    border: 2px solid rgba(168, 85, 247, 0.2);
    transition: all 0.3s ease;
  }
  
  .ing:hover {
    border-color: rgba(168, 85, 247, 0.5);
    background: rgba(168, 85, 247, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  }
  
  @media (min-width: 992px) {
    .drink {
      display: grid;
      grid-template-columns: 2fr 3fr;
      gap: 4rem;
      align-items: center;
      padding: 3rem;
    }
    .drink-info {
      padding-top: 0;
    }
  }
`;

export default Wrapper;
