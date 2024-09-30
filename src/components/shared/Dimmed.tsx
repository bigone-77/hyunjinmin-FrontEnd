function Dimmed({ children }: { children: React.ReactNode }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 z-dimmed'>
      {children}
    </div>
  );
}

export default Dimmed;
