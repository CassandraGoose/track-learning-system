'use client';

import { useEffect, useState, useRef } from 'react';
import { showProof } from '@/app/actions';
import { notFound, useSearchParams, useRouter } from 'next/navigation';
import { Proof } from '@/app/lib/interface';
import Link from 'next/link';
export default function Modal() {
  const searchParams = useSearchParams();
  const proofParam = searchParams.get('proof');
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  
  if (!proofParam) {
    notFound();
  }

  const [viewingProof, setViewingProof] = useState<Proof | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (proofParam) {
        const foundProof = await showProof(proofParam);

        setViewingProof(foundProof!);
      }
    };
  
    fetchData();
  }, [proofParam]);

  useEffect(() => {
    document.addEventListener('keydown', keyboardListener);
    return () => document.removeEventListener('keydown', keyboardListener);
  });

  const keyboardListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      router.push('/profile');
    } else if (e.key === "Tab") {
      const focusableElement = modalRef.current!.querySelectorAll('.btn');
      if (document.activeElement !== focusableElement[0]) {
        (focusableElement[0] as HTMLElement).focus();
        return e.preventDefault();
      }
    }
  };

  return (viewingProof && <div ref={modalRef} className="modal modal-open" role="dialog" id="my_modal_8">
  <div className="modal-box bg-bright max-w-full h-min border border-black rounded-md">
    <p className="font-bold text-lg text-primary">{viewingProof.title}</p>
    <p className="py-4">{viewingProof.description}</p>
    <p className="text-sm text-light">* We will be adding support for images and videos soon!</p>
    <p className="border-black border overflow-y-scroll max-h-56 rounded-md p-4">{viewingProof.justification}</p>
    <div className="modal-action">
     <Link href="/profile" className="btn">Close</Link>
    </div>
  </div>
</div>)
}