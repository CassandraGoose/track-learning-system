export default function ContentAreaPill({contentArea}: {contentArea: string}) {
  return (
    <div
      className="badge badge-outline"
      data-testid="content-area-badge"
    >
      {contentArea}
    </div>
  );
}
