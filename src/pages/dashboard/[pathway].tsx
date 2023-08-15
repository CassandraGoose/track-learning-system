import type {  GetServerSideProps, InferGetServerSidePropsType } from 'next' 
import { getPathwayByUserId } from '../../lib/queries';
import { ContentArea } from '../../lib/interface';

export const getServerSideProps: GetServerSideProps = async (context) => {

  const { pathway } = context.params! as { pathway: string };
  // temporarily set up just to grab user 1's version of this pathway. when we have auth, we'll change this.
    try {
      const userPathway = await getPathwayByUserId('cljvusdou00003ntltwo9mhm5', pathway);
  
      return {
        props: {
          pathway: JSON.parse(JSON.stringify(userPathway)),
        }
      }
    } catch (e) {
        // apparently, it's not good practice to do try/catches in getStaticProps because next will just auto-handle errors that are thrown. I'm going ot leave
      // this try catch in for now, but i'll make a ticket to revisit this after gathering some intel.
      // https://github.com/vercel/next.js/discussions/11180#discussioncomment-2399
      console.error(e);
      throw new Error('Failed to fetch');
    }
  }

export default function Pathway({
  pathway,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const selectedPathway = pathway.pathways[0]
  console.log(selectedPathway.contentArea)
  return (
    <section>
      <h1>{selectedPathway.title}</h1>
      <h2>{selectedPathway.description}</h2>
      <div>
        {selectedPathway.contentArea.map((contentArea: ContentArea) => {
          return <span>{contentArea.title}</span>
        })}
      </div>
    </section>
  )
}

//todo update all dbs to have 'Web Literacy' as the content area for use qual 
//update all dbs to have Use the Track Learning System instead of Use Qual
// update all dbs to hav eMetacognition as the content area of teh learn to learn track. 

