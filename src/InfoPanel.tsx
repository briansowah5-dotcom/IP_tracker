import type { LocationData } from './types';

interface InfoPanelProps {
  data: LocationData;
  loading: boolean;
}

function InfoPanel({ data, loading }: InfoPanelProps) {
  if (loading) {
    return <div className="text-center py-8 text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex justify-around bg-white px-8 py-6 rounded-2xl shadow-lg mx-12 -mt-12 relative z-50 gap-8">
      <div className="flex flex-col text-left">
        <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">IP Address</span>
        <span className="text-xl font-bold text-gray-800">{data.ip}</span>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">Location</span>
        <span className="text-xl font-bold text-gray-800">{data.location}</span>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">Timezone</span>
        <span className="text-xl font-bold text-gray-800">{data.timezone}</span>
      </div>
      <div className="flex flex-col text-left">
        <span className="text-xs text-gray-400 uppercase tracking-wider mb-2">ISP</span>
        <span className="text-xl font-bold text-gray-800">{data.isp}</span>
      </div>
    </div>
  );
}

export default InfoPanel;