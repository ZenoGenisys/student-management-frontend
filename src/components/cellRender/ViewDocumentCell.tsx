import VisibilityIcon from '@mui/icons-material/Visibility';

type ViewDocumentCellProps = {
  url: string;
};
const ViewDocumentCell = ({ url }: ViewDocumentCellProps) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <VisibilityIcon />
    </a>
  );
};

export default ViewDocumentCell;
