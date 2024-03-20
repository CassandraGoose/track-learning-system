'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <form className="flex w-full items-center justify-center">
      <label className="input input-bordered input-primary flex items-center gap-2 bg-bright">
        <input
          type="text"
          className="grow bg-bright"
          placeholder="Search"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get('query')?.toString()}
        />
        <kbd className="kbd kbd-sm text-bright">⌘</kbd>
        <kbd className="kbd kbd-sm text-bright">K</kbd>
      </label>
    </form>
  );
}
