const Container = (props: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`px-6 w-full mx-auto max-w-screen-xl ${props.className || ""}`}>
      {props.children}
    </div>
  );
};

export default Container;
