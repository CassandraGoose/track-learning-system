export default function PathwayCard({
  title,
  description,
  cardActionChild,
  rightBlockChild,
}: {
  title: string;
  description: string;
  cardActionChild: React.ReactNode;
  rightBlockChild: React.ReactNode;
}) {
  return (
    <article
    className='card w-full border rounded-md border-black'
    key={title}
    data-testid='pathway-card'>
    <div className='flex flex-col md:flex-row items-center '>
      <div className='card-body'>
        <p className='card-title'>{title}</p>
        <p>{description}</p>
        {cardActionChild}
      </div>
      {rightBlockChild}
    </div>
  </article>
  );
}
