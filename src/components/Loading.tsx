import ReactLoading from 'react-loading';

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-90px)]">
      <ReactLoading type="spin" color="#6046ff" height="5%" width="5%" />
    </div>
  );
}