import { ContentArea, Competency } from '../lib/interface';

export default function PathwayProgressDetails({
  contentAreas,
}: {
  contentAreas: [ContentArea];
}) {
  return (
    <>
      {contentAreas.map((contentArea: ContentArea) => (
        <div
          tabIndex={0}
          className='collapse collapse-plus border border-base-300 bg-base-200 mt-16 rounded-md'>
          <div className='collapse-title'>
            <p className='font-medium text-lg' data-cy="content-area-title">{contentArea.title}</p>
            <p data-cy="content-area-description">{contentArea.description}</p>
            <div className='flex items-center justify-center pt-8'>
              <p className='font-thin' data-cy="competency-progress">3/7 competencies met</p>
            </div>
          </div>
          <div className='collapse-content'>
            <table className='table table-zebra table-lg'>
              <thead>
                <tr>
                  <th>Completed</th>
                  <th>Competency</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contentArea.competencies.map((competency: Competency) => (
                  <tr key={competency.id}>
                    <td>
                      <span className='flex items-center space-x-3'>
                        <span>✅</span>
                      </span>
                    </td>
                    <td>
                      <span className='flex items-center space-x-3'>
                        <p>{competency.title}</p>
                      </span>
                    </td>
                    <td>
                      <p>{competency.description}</p>
                    </td>
                    <td>
                      <button className='btn btn-secondary'>Proof</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </>
  );
}
