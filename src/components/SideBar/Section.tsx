interface ISectionProps {
  title: string;
  list: string[];
}

function Section({ title, list }: ISectionProps) {
  return (
    <section>
      <h1 className='mb-2 font-semibold'>{title}</h1>
      <ul className='flex flex-col gap-1'>
        {list.map((l, index) => (
          <li key={index} className='text-sm'>
            - {l}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Section;
