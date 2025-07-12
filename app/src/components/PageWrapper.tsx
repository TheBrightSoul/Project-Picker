// components/PageWrapper.tsx
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="h-full w-full flex items-center justify-center">
    <div className="backdrop-blur-md bg-black/30 p-10 rounded-lg text-hacker-text-light dark:text-hacker-text-dark shadow-lg">
      {children}
    </div>
  </div>
);

export default PageWrapper;
