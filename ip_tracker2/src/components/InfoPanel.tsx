import type { LocationData } from '../types';

interface InfoPanelProps {
  data: LocationData;
  loading: boolean;
}

export default function InfoPanel({ data, loading }: InfoPanelProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <div className="flex flex-col space-y-2 pt-4 md:pt-0">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">IP Address</span>
          <span className="text-2xl font-bold text-gray-900">{data.ip}</span>
        </div>
        <div className="flex flex-col space-y-2 md:pl-8 pt-4 md:pt-0">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Location</span>
          <span className="text-2xl font-bold text-gray-900">{data.location}</span>
        </div>
        <div className="flex flex-col space-y-2 md:pl-8 pt-4 md:pt-0">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Timezone</span>
          <span className="text-2xl font-bold text-gray-900">{data.timezone}</span>
        </div>
        <div className="flex flex-col space-y-2 md:pl-8 pt-4 md:pt-0">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">ISP</span>
          <span className="text-2xl font-bold text-gray-900 truncate">{data.isp}</span>
        </div>
      </div>
    </div>
  );
}
