import Title from "./Title";

function Section({ title, children , class1 }) {
  return (
    <>
      <div className={`py-8 flex flex-col gap-y-6 ${class1}`}>
        {title && <Title first={title} />}
        <div className="">{children}</div>
      </div>
    </>
  );
}

export default Section;
